class UserService {
  constructor(query) {
    this.query = query;
  }
  async findOne(data) {
    return await this.query.findOne(data);
  }
    
  async findOneAndUpdate(id, data) {
    return await this.query.findOneAndUpdate(id, data, { new: true });
  }
  async getAllUsers() {
    return await this.query.findAll();
  }
    
  async create(data) {
    return await this.query.create(data);
  }
    
  async update(id, data) {
    return await this.query.update(id, data);
  }
    
  async delete(id) {
    return await this.query.delete(id);
  }

}

module.exports = UserService;