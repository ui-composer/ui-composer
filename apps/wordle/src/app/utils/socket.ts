// @ts-expect-error this is esm issue
import { connect } from 'socket.io-client';

/** TODO: add eslint rule to force importing from app's data/constants instead of expo-constants */
import { Constants } from '../data/constants';

const socket = connect(Constants.expoConfig.extra.env.serverUrl);
export default socket;
