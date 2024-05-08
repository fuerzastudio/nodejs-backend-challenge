export class Utils {
  static async paginate(page: number, limit: number) {
    const recordLimit = limit <= 100 ? limit : 20;

    return {
      skip: (page - 1) * recordLimit,
      take: recordLimit * 1,
    };
  }
}
