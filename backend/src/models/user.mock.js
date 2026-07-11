import bcrypt from 'bcryptjs';

// In-memory mock database for users
export const usersMock = [];

export const createUserMock = async ({ email, password, role, name, stadiumId = "stadium_001" }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password: hashedPassword,
    role,
    preferredLanguage: "en",
    stadiumId,
    createdAt: new Date().toISOString()
  };
  usersMock.push(newUser);
  return newUser;
};

// Create some default users
(async () => {
  await createUserMock({ email: 'fan@example.com', password: 'password', role: 'FAN', name: 'John Fan' });
  await createUserMock({ email: 'org@example.com', password: 'password', role: 'ORGANIZER', name: 'Jane Organizer' });
})();
