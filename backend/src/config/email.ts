
class Configs {
  public service = "Gmail"
  public host = `${process.env.host}`
  public port = `${process.env.port}`
  public user = `${process.env.user}`
  public password = `${process.env.password}`
}

export default new Configs;