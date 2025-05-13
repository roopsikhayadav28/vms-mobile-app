import JWT from 'expo-jwt';
const pvtKey = `wWUMvwz7uahDoXzPYkXjIDILDiCq6LwkmYPp/KLu8REksVx8pI889YAlnHCeE5dr`

export const token = JWT.encode({
  vms: {
    dummyField: 'abcdefgh',
  },
}, pvtKey); // Algorithm: HS256 by default
