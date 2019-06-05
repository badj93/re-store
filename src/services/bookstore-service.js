export default class BookstoreService {

  data = [
    { id: 1, title: 'test 1', author: 'man1', price: 32, coverImage: 'http://s003.radikal.ru/i202/1405/45/86a3a577fba4.png'},
    { id: 2, title: 'test 2', author: 'man2', price: 45, coverImage: 'http://s003.radikal.ru/i202/1405/45/86a3a577fba4.png'},
  ];

  getBooks() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.90) {
          reject(new Error('Something boot error'))
        } else {
          resolve(this.data)
        }
      }, 700);
    });
  }
}
