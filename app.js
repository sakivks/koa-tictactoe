const Koa = require("koa");
const logger = require("koa-logger");
const koaBody = require("koa-body");
const app = new Koa();
const cors = require("@koa/cors");

app.use(
  koaBody({
    jsonLimit: "1kb"
  })
);

app.use(logger());
app.use(cors());

app.use(async function(ctx) {
  const body = ctx.request.body;
  if (!body || !body.length) {
    console.log(body);
    ctx.throw(400, "Array of entries required in body");
  }

  // const arr = ["X", null, "X", "O", null, "O", "X", "O", null];
  const nulls = getAllIndexes(body, null);
  const resp = nulls[Math.floor(Math.random() * nulls.length)];
  console.log(`${body} --> ${resp}`);
  ctx.body = resp;
});

function getAllIndexes(arr, val) {
  const indexes = [];
  for (let i = 0; i < arr.length; i++) if (arr[i] === val) indexes.push(i);
  return indexes;
}

app.listen(process.env.PORT || 3000);
console.log(`server running at ${process.env.PORT || 3000}`);
