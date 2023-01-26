import {ApolloDriver, ApolloDriverConfig} from '@nestjs/apollo';
import {HttpModule} from '@nestjs/axios';
import {CacheModule, Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {APP_GUARD} from '@nestjs/core';
import {GraphQLModule} from '@nestjs/graphql';
import {ThrottlerModule} from '@nestjs/throttler';
import {SgPayModule} from '@sg-demo/bbpou/sgpay';
// import {ApolloServerPluginLandingPageLocalDefault} from 'apollo-server-core';
import {DirectiveLocation, GraphQLDirective} from 'graphql';
import {join} from 'path';

import {AppController} from './app.controller';
import {AppService} from './app.service';
// eslint-disable-next-line max-len
import {upperDirectiveTransformer} from './common/directives/upper-case.directive';
import {RecipesModule} from './recipes/recipes.module';
import {AuthorsModule} from './authors/authors.module';
import {GqlThrottlerGuard} from './guards/gqlthrottler.guard';
import {Context} from 'apollo-server-core';
import {HeroesModule} from './heroes/heroes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    AuthorsModule,
    RecipesModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: async (configService: ConfigService) => ({
        context: ({req, res}) => ({req, res}),
        playground:
          true && configService.get<string>('NODE_ENV') !== 'production',
        autoSchemaFile: join(process.cwd(), 'apps/core/src/schema.gql'),
        sortSchema: true,
        transformSchema: (schema) => upperDirectiveTransformer(schema, 'upper'),
        installSubscriptionHandlers: true,
        subscriptions: {
          'graphql-ws': {
            onConnect: (context: Context<any>) => {
              const {connectionParams, extra} = context;
              const authToken = connectionParams.authToken;
              // if (!isValid(authToken)) {
              //   throw new Error('Token is not valid');
              // }
              extra.user = {user: {}};
            },
          },
        },
        buildSchemaOptions: {
          directives: [
            new GraphQLDirective({
              name: 'upper',
              locations: [DirectiveLocation.FIELD_DEFINITION],
            }),
          ],
        },
        // plugins: [ApolloServerPluginLandingPageLocalDefault()],
      }),
      inject: [ConfigService],
    }),
    HttpModule,
    SgPayModule,
    AuthorsModule,
    // ClientsModule.register([
    //   {
    //     name: 'HERO_PACKAGE',
    //     transport: Transport.GRPC,
    //     options: {
    //       package: 'hero',
    //       protoPath: join(process.cwd(), 'apps/core/src/hero/hero.proto'),
    //     },
    //   },
    // ]),
    HeroesModule,
  ],
  controllers: [AppController],
  providers: [AppService, {provide: APP_GUARD, useClass: GqlThrottlerGuard}],
})
export class AppModule {}
