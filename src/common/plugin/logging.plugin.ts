import { Plugin } from '@nestjs/apollo';
import {
    ApolloServerPlugin,
    GraphQLRequestListener,
} from 'apollo-server-plugin-base'
import {GraphQLRequestContext} from 'apollo-server-types';
import {Logger} from '@nestjs/common';
import {get} from 'lodash'

@Plugin()
export class LoggingPlugin implements ApolloServerPlugin {
    async requestDidStart(requestContext: GraphQLRequestContext): Promise<GraphQLRequestListener> {
        const query = get(requestContext, 'request.query')
        const playgroundCall = get(requestContext, 'request.operationName') === 'IntrospectionQuery'
        if (!playgroundCall)
            Logger.debug(`⛩  Request » ${query}`, 'GraphQL')
        return {
            async willSendResponse() {
                if (!playgroundCall)
                    Logger.debug(`⛩  Response » OK`, 'GraphQL')
            },
        };
    }
}
