export const normalizeEmail = (value) => (value || '').trim().toLowerCase();
export const normalizePassword = (value) => (value || '').trim();

export const normalizeUsers = (users) => {
  if (!Array.isArray(users)) {
    return [];
  }

  return users.map((user) => ({
    ...user,
    email: normalizeEmail(user.email),
    password: normalizePassword(user.password),
    firstName: (user.firstName || '').trim(),
    middleName: (user.middleName || '').trim(),
    lastName: (user.lastName || '').trim(),
    country: (user.country || '').trim(),
    address: (user.address || '').trim(),
    phone: (user.phone || '').trim(),
  }));
};

export const findUserByCredentials = (users, email, password) => {
  const normalizedUsers = normalizeUsers(users);
  const normalizedEmail = normalizeEmail(email);
  const normalizedPassword = normalizePassword(password);

  if (!normalizedEmail || !normalizedPassword) {
    return null;
  }

  return normalizedUsers.find(
    (user) => user.email === normalizedEmail && user.password === normalizedPassword
  ) || null;
};
