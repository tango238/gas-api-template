つかいかた

1. `clasp create` したあと、このなかのファイルをつっこんでね
2. `npm run deploy` するとシュッとデプロイするよ
3. ライブラリとしてりようするスクリプトからインポートしてね
3. GASのかきかたはこんなかんじだよ

```
var result = GasAPI.login(user, pass);

if (result) {
  json = JSON.parse(result);
  var token = json.token;

  json = GasAPI.methods(token).sample.search("hogehoge");
}
```

4. こまったらじぶんでかいけつしてね！
