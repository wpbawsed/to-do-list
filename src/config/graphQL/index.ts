import {ConfigService} from '@nestjs/config'
// @ts-ignore
import {DirectiveLocation, GraphQLDirective} from 'graphql'
import {ApolloDriverConfig} from '@nestjs/apollo'
import {ComplexityPlugin, LoggingPlugin, upperDirectiveTransformer} from '../../common'

class GraphQLService {
    public getGraphQLConfig(configService: ConfigService): ApolloDriverConfig{
        const mode = configService.get<string>('MODE', 'dev')
        const complexity = configService.get<number>('COMPLEXITY', 20)
        return {
            autoSchemaFile: true,
            sortSchema: true,
            introspection: mode !== 'PROD',
            playground: mode !== 'PROD',
            // installSubscriptionHandlers: true,
            context: ({ req, res }) => ({ req, res }),
            transformSchema: (schema) => upperDirectiveTransformer(schema, 'upper'),
            plugins: [
                new ComplexityPlugin(complexity),
                new LoggingPlugin()
            ],
            buildSchemaOptions: {
                directives: [
                    new GraphQLDirective({
                        name: 'upper',
                        locations: [DirectiveLocation.FIELD_DEFINITION],
                    }),
                ],
            },
            formatError: (error) => {
                return {
                    statusCode: error.extensions?.code || 500,
                    message: error.extensions?.exception?.response?.message || error.message,
                    type: error.extensions?.exception?.name || error.name,
                    timestamp: new Date().toISOString(),
                }
            },
        }
    }
}

export const graphQL = new GraphQLService()
