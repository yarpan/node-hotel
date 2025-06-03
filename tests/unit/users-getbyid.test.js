const db = require('../../src/config/db');
jest.mock('../../src/config/db'); // Mock the whole db module

db.users = {
  findById: jest.fn(),
};

async function getUserById(id) {
  return db.users.findById(id);
}

describe('getUserById (inline)', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });


  it('returns user by ID', async () => {
    const mockUser = { id: 1, name: 'Alice' };
    db.users.findById.mockResolvedValue(mockUser);

    const user = await getUserById(1);
    expect(user).toEqual(mockUser);
    expect(db.users.findById).toHaveBeenCalledWith(1);
  });


  it('returns null for non-existent user', async () => {
    db.users.findById.mockResolvedValue(null);

    const user = await getUserById(999);
    expect(user).toBeNull();
  });


  it('throws error on DB failure', async () => {
    db.users.findById.mockRejectedValue(new Error('DB error'));

    await expect(getUserById(1)).rejects.toThrow('DB error');
  });
  
});
