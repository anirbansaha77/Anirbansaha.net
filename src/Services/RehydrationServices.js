// import ReduxPersist from '../Config/ReduxPersist';
// import { createTransform } from "redux-persist";
import session from 'redux-persist/lib/storage/session';
// is this object already Immutable?

const REDUX_PERSIST = {
    storage: session,
    key: 'samsung-pdp-phone-configurator',
    version: '1.0',
    blacklist: ['queryParams'],
    // whitelist: [], Optionally, just specify the keys you DO want stored to
    // persistence. An empty array means 'don't store any reducers' -> infinitered/ignite#409
    // transforms: [immutableTransform()],
};

export default REDUX_PERSIST;
