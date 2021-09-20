import { buildSchema } from 'type-graphql';
import { gqlAuthChecker } from '@shared/infra/http/utils/gqlAuthChecker';
import { GraphQLSchema } from 'graphql';

import UserResolver from '@user/infra/http/resolvers/user';
import EntityResolver from '@entity/infra/http/resolvers/entity';
import EntityAddressResolver from '@entity/infra/http/resolvers/entityAddress';
import PlaceResolver from '@location/infra/http/resolvers/place';
import StateResolver from '@location/infra/http/resolvers/state';
import CityResolver from '@location/infra/http/resolvers/city';
import NeighborhoodResolver from '@location/infra/http/resolvers/neighborhood';
import EntityPhoneResolver from '@entity/infra/http/resolvers/entityPhone';
import PaymentMethodResolver from '@payment/infra/http/resolvers/paymentMethod';
import PaymentMethodBaseResolver from '@payment/infra/http/resolvers/paymentMethodBase';
import DeliveryMethodResolver from '@delivery/infra/http/resolvers/deliveryMethod';
import DeliveryMethodBaseResolver from '@delivery/infra/http/resolvers/deliveryMethodBase';

const createSchema = (): Promise<GraphQLSchema> =>
    buildSchema({
        resolvers: [
            UserResolver,
            EntityResolver,
            EntityAddressResolver,
            PlaceResolver,
            StateResolver,
            CityResolver,
            NeighborhoodResolver,
            EntityPhoneResolver,
            PaymentMethodResolver,
            PaymentMethodBaseResolver,
            DeliveryMethodResolver,
            DeliveryMethodBaseResolver,
        ],
        authChecker: ({ context }) => {
            return gqlAuthChecker.execute(context);
        },
    });

export default createSchema;
