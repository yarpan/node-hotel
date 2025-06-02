const path = require('path');
console.log('DB PATH:', path.resolve(__dirname, '../../../src/config/db'));

const userService = require('../services/userService');
const db = require('../../../src/config/db');
jest.mock('../../../src/config/db');

describe('UserService.getUserById', () => {
  afterEach(() => jest.clearAllMocks());

  it('returns user by ID', async () => {
    const mockUser = { id: 1, name: 'Alice' };
    db.users.findById.mockResolvedValue(mockUser);

    const user = await userService.getUserById(1);
    expect(user).toEqual(mockUser);
    expect(db.users.findById).toHaveBeenCalledWith(1);
  });

  it('returns null for non-existent user', async () => {
    db.users.findById.mockResolvedValue(null);

    const user = await userService.getUserById(999);
    expect(user).toBeNull();
  });

  it('throws error on db failure', async () => {
    db.users.findById.mockRejectedValue(new Error('DB error'));

    await expect(userService.getUserById(1)).rejects.toThrow('DB error');
  });
});