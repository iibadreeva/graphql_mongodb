import merge from 'lodash.merge';
// import { bookResolvers } from './Book';
import { viewerResolvers } from './Viewer';

// export const resolvers = merge(bookResolvers, viewerResolvers);
export const resolvers = merge(viewerResolvers);
