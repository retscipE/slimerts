import { category } from "../../utils";
import botinfo from "./botinfo";
import role from "./role";
import { help } from './help'
import embed from './embed'
import suggest from './suggest'

// TODO: Comments on Utility commands
export default category("Utility", "Utility commands that help with server necessities.", [
  botinfo,
  role,
  help,
  embed,
  suggest,
])