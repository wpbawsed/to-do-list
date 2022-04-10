import { Module } from '@nestjs/common'
import {APP_GUARD} from '@nestjs/core'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import {TerminusModule} from '@nestjs/terminus'
import {ThrottlerModule} from '@nestjs/throttler'
import {TypeOrmModule} from '@nestjs/typeorm'
import {ConfigModule, ConfigService} from '@nestjs/config'
// @ts-ignore
import {DirectiveLocation, GraphQLDirective} from 'graphql'
import {
    AuthModule
} from './auth/auth.module'
import {
    AppService
} from './app.service'
import {
    AppController
} from './app.controller'
import {
    ImageModule,
    LineLoginConfigModule, RoleModule, UserModule
} from './modules'
import {
    typeorm,
    throttler,
    graphQL
} from './config'
import {
    GqlThrottlerGuard,
} from './common'
@Module({
    imports: [
        // ---- Config
        ConfigModule.forRoot(),
        // ---- HealthCheck
        TerminusModule,
        // ---- Rate limit
        ThrottlerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: throttler.getThrottlerConfig
        }),
        // ---- Database
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: typeorm.getTypeOrmConfig
        }),
        // ---- GraphQL
        GraphQLModule.forRootAsync<ApolloDriverConfig>({
            driver: ApolloDriver,
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: graphQL.getGraphQLConfig
        }),
        // ---- Auth
        AuthModule,
        // ---- Controller
        UserModule,
        RoleModule,
        ImageModule,
        LineLoginConfigModule
    ],
    controllers: [
        AppController
    ],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: GqlThrottlerGuard,
        },
    ]
})

export class AppModule {}
