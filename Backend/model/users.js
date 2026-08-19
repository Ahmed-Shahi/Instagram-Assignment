const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

// On Vercel serverless functions, the root filesystem is read-only except for /tmp
const localDataPath = path.join(__dirname, '..', 'data', 'user.json');
const tmpDataPath = path.join('/tmp', 'user.json');

// In-memory fallback
let inMemoryUsers = null;

const getFilePath = () => {
    // If running on Vercel or production serverless
    if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
        return tmpDataPath;
    }
    return localDataPath;
};

const readData = async () => {
    const targetPath = getFilePath();

    // If we already have in-memory users, return them
    if (inMemoryUsers !== null && Array.isArray(inMemoryUsers)) {
        return inMemoryUsers;
    }

    try {
        if (fs.existsSync(targetPath)) {
            const raw = fs.readFileSync(targetPath, 'utf-8');
            inMemoryUsers = JSON.parse(raw || '[]');
            return inMemoryUsers;
        }

        // If tmp file doesn't exist yet on Vercel, read initial data from localDataPath
        if (fs.existsSync(localDataPath)) {
            const raw = fs.readFileSync(localDataPath, 'utf-8');
            inMemoryUsers = JSON.parse(raw || '[]');
            // Try to copy to /tmp for future writes
            try {
                fs.writeFileSync(tmpDataPath, JSON.stringify(inMemoryUsers, null, 2));
            } catch (e) {
                console.warn('Could not write to tmp path:', e.message);
            }
            return inMemoryUsers;
        }

        inMemoryUsers = [];
        return inMemoryUsers;
    } catch (err) {
        console.error('Error reading user data:', err);
        return inMemoryUsers || [];
    }
};

const writeData = async (data) => {
    inMemoryUsers = data;
    const targetPath = getFilePath();

    try {
        const dir = path.dirname(targetPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(targetPath, JSON.stringify(data, null, 2));
        return true;
    } catch (err) {
        console.warn('File write warning (continuing with in-memory store):', err.message);
        return true;
    }
};

exports.createUser = async (data, uid) => {
    try {
        const users = await readData();
        const matched = users.find((u) => u.email === data.email);

        if (matched) {
            return 'user already exists!';
        }

        const encPass = await bcrypt.hash(data.password, 10);
        const newUser = {
            email: data.email,
            password: encPass,
            uid: uid,
            fullName: data.fullName || '',
            username: data.username || '',
            day: data.day || '',
            month: data.month || '',
            year: data.year || '',
        };

        const updatedUsers = [...users, newUser];
        await writeData(updatedUsers);
        return 'user created!';
    } catch (err) {
        console.error('createUser error:', err);
        throw err;
    }
};

exports.findUser = async (email) => {
    try {
        const users = await readData();
        const matched = users.find((u) => u.email === email);
        return matched || null;
    } catch (err) {
        console.error('findUser error:', err);
        return null;
    }
};