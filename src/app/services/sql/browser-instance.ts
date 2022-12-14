export const browserDBInstance = (db) => ({
  executeSql: (sql: string, params: any[]) =>
    new Promise(async (resolve) => {
      db.transaction((transaction) => {
        transaction.executeSql(
          sql,
          params,
          (tr, result) => {
            // eslint-disable-next-line prefer-arrow/prefer-arrow-functions, space-before-function-paren
            result.rows.item = function (index: number) {
              return result.rows[index];
            };
            resolve(result);
          },
          (tr, err: { code: number; message: string }) => {
            console.log(err);
            throw new Error(err.code + ' ' + err.message);
          }
        );
      });
    }),
  sqlBatch: (arr) =>
    new Promise((r, rr) => {
      const batch = [];
      db.transaction((tx) => {
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < arr.length; i++) {
          batch.push(
            new Promise((resolve, reject) => {
              tx.executeSql(arr[i], [], () => {
                resolve(true);
              });
            })
          );
          Promise.all(batch).then(() => r(true));
        }
      });
    }),
});
