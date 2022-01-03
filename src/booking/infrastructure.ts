interface DAO {
  query: (string) => void
}

export class Repository {
  dao: Promise<DAO>

  constructor(dao: DAO) {
    this.dao = dao
  }  

  findOne() {
  }

  async persist(entity: any) {
    const q = await this.dao.q
  }
}
