module.exports.Config = {
  NODE_ENV: process.env.NODE_ENV || "development",
  USERTYPES: { employer: 1, recruiter: 2, jobseeker: 3 },
  PORT: process.env.PORT || 3000,
  BE_PORT: process.env.PORT || 4000,
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_USER: process.env.DB_USER || "mdhaseeb769",
  DB_PASS: process.env.DB_PASS || "kvFuUJ2nqNDhyWom",
  DB_CLUSTERNAME: "dashboard.j2tpokt.mongodb.net",
  DB_DATABASE: process.env.DB_DATABASE || "portalDB",

  SECRET_JWT: process.env.SECRET_JWT || "756ac61e-4078-4af3-8f87-30bc1bc9fd48",
};



// #kvFuUJ2nqNDhyWom
// mongodb + srv://mdhaseeb769:<password>@dashboard.j2tpokt.mongodb.net/