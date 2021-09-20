import { PluginDefinition } from 'apollo-server-core';
import { GraphQLError } from 'graphql';
import { StatusCodes } from 'http-status-codes';

function getStatusCode(errors: readonly GraphQLError[]): StatusCodes {
    const error = errors[0];

    if (!error.extensions?.code) {
        return StatusCodes.INTERNAL_SERVER_ERROR;
    }

    switch (error.extensions.code) {
        case 'UNEXPECTED_ERROR':
            return StatusCodes.INTERNAL_SERVER_ERROR;
        case 'UNAUTHENTICATED':
            return StatusCodes.UNAUTHORIZED;
        case 'FORBIDDEN':
            return StatusCodes.FORBIDDEN;
        case 'NOT_FOUND':
            return StatusCodes.NOT_FOUND;
        case 'CONFLICT':
            return StatusCodes.CONFLICT;
        case 'TOO_MANY':
            return StatusCodes.TOO_MANY_REQUESTS;
        case 'PAYMENT_REQUIRED':
            return StatusCodes.PAYMENT_REQUIRED;
        case 'INVALID_PARAM':
        case 'GRAPHQL_PARSE_FAILED':
        case 'GRAPHQL_VALIDATION_FAILED':
            return StatusCodes.BAD_REQUEST;
        default:
            return StatusCodes.INTERNAL_SERVER_ERROR;
    }
}

const formatErrorPlugin: PluginDefinition = {
    requestDidStart: () => ({
        willSendResponse({ errors, response }) {
            if (response && response.http) {
                if (errors && errors.length) {
                    response.data = undefined;
                    response.http.status = getStatusCode(errors);
                } else {
                    response.http.status = StatusCodes.OK;
                }
            }
        },
    }),
};

export default formatErrorPlugin;
