// import {Metadata, ServerUnaryCall} from '@grpc/grpc-js';
import {Controller, Get, Inject, OnModuleInit, Param} from '@nestjs/common';
import {ClientGrpc, GrpcMethod, GrpcStreamMethod} from '@nestjs/microservices';
import {Observable, ReplaySubject, Subject, toArray} from 'rxjs';
import {HeroById} from './interfaces/hero-by-id.interface';
import {Hero} from './interfaces/hero.interface';
// import {HeroesService} from './heroes.service';

interface HeroesService {
  findOne(data: HeroById): Observable<Hero>
  findMany(upstream: Observable<HeroById>): Observable<Hero>
}

@Controller('hero')
export class HeroesController implements OnModuleInit {
  private readonly items: Hero[] = [
    {id: 1, name: 'John'},
    {id: 2, name: 'Doe'},
  ];
  private heroesService: HeroesService;

  constructor(@Inject('HERO_PACKAGE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.heroesService = this.client.getService<HeroesService>('HeroesService');
  }

  @Get()
  getMany(): Observable<Hero[]> {
    const ids$ = new ReplaySubject<HeroById>();
    ids$.next({id: 1});
    ids$.next({id: 2});
    ids$.complete();

    const stream = this.heroesService.findMany(ids$.asObservable());
    return stream.pipe(toArray());
  }

  @Get(':id')
  getById(@Param('id') id: string): Observable<Hero> {
    return this.heroesService.findOne({id: +id});
  }

  @GrpcMethod('HeroesService')
  findOne(data: HeroById): Hero {
    return this.items.find(({id}) => id === data.id);
  }

  @GrpcStreamMethod('HeroesService')
  findMany(data$: Observable<HeroById>): Observable<Hero> {
    const hero$ = new Subject<Hero>();

    const onNext = (heroById: HeroById) => {
      const item = this.items.find(({id}) => id === heroById.id);
      hero$.next(item);
    };
    const onComplete = () => hero$.complete();
    data$.subscribe({
      next: onNext,
      complete: onComplete,
    });

    return hero$.asObservable();
  }

  // @GrpcMethod('HeroesService', 'FindOne')
  // findOne(data: HeroById, metadata: Metadata, call: ServerUnaryCall<any, any>)
  //   : Hero {
  //   const items = [
  //     {id: 1, name: 'John'},
  //     {id: 2, name: 'Doe'},
  //   ];
  //   return items.find(({id}) => id === data.id);
  // }

  // @Get()
  // call(): Observable<any> {
  //   const metadata = new Metadata();
  //   metadata.add('Set-Cookie', 'yummy_coookie=choco');

  //   return this.heroesService.findOne({id: 1});
  // }
}
