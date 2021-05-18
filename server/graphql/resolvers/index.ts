import merge from 'lodash.merge';
import { bookResolvers } from './Book';
import { viewerResolvers } from './Viewer';
import { userResolvers } from './User';

export const resolvers = merge(bookResolvers, viewerResolvers, userResolvers);
