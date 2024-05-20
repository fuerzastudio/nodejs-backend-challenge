class TypeORMPostRepository extends IPostRepository {
  async create(post) {
    return await this.ormRepository.save(post);
  }
}