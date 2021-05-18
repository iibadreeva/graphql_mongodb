export { Request } from 'express';
import { Database, User } from '../lib/types';

export const authorize = async (
  db: Database,
  // req: Request
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  req: any
): Promise<User | null> => {
  const token = req.get('X-CSRF-TOKEN');
  const viewer = await db.users.findOne({
    _id: req.signedCookies.viewer,
    token
  });
  console.log('toke', token, req.signedCookies.viewer, viewer);

  return viewer;
};
