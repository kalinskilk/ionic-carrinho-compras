export const browserDBInstance = (db) => ({
  executeSql: (sql, params) =>
    new Promise(async (resolve, reject) => {
      try {
        /* TODO QUANDO DA ERRO NAO DA REJECCT */
        db.transaction((tx) => {
          tx.executeSql(sql, params, (tx, rs) => {
            // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
            rs.rows.item = function (index) {
              return rs.rows[index];
            };
            resolve(rs);
          });
        });
      } catch (err) {
        console.log(err);
        reject(err);
      }
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
