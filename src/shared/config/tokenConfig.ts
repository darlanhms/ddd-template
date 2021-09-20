const tokenConfig = {
    secret: process.env.JWT_SECRET || '',
    expiresIn: 1576801728, // 6 meses
};

export default tokenConfig;
