## ###GENERATE KEY

## docker compose exec backend ./generate_admin_key.sh

---

1 - ADD TO THE ENVIREMENT VARIABLE
export CONVEX_SELF_HOSTED_URL=http://127.0.0.1:3210
export CONVEX_SELF_HOSTED_ADMIN_KEY=convex-self-hosted|0159ceb957f8b0da0b0798d64916ea8481051aaabf8d65b286a26d6c7c0cd37dbddc57a513
2 - ADD TO THE PACKAGE JSON
"deploy:local": "npx convex deploy --env-file .env.local",
"dev:convex": "nodemon --watch convex --ext ts,js,json --exec \"npm run deploy:local\""
3 - INSTALL NODEMON
npm install --save-dev nodemon

---

## ###IMPORT DATA EXAMPEL
## npx convex import --table tasks database/sampleData.jsonl

## ##ADD GENERATED FILE
1 - UPDATE tsconfig.json
2 - ADD tsconfig.convex.json
3 - RUN This Command : npx convex codegen

---
## 📚 Additional Resources

- [Convex Documentation](https://docs.convex.dev/)
- [Docker Compose Reference](https://docs.docker.com/compose/reference/)
- [Nodemon Documentation](https://nodemon.io/)

---

## 📝 Tips

- Always keep your `.env.local` file secure and never commit secrets to version control.
- Use `npx convex codegen` after any schema changes to keep your types in sync.
- For troubleshooting, check logs with `docker compose logs backend`.

---

## 🧩 Example Directory Structure

```
/project-root
    ├── convex/
    ├── database/
    │   └── sampleData.jsonl
    ├── tsconfig.json
    ├── tsconfig.convex.json
    ├── .env.local
    ├── package.json
    └── NOTE.MD
```