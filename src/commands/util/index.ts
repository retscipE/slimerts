import { category } from "../../utils";
import botinfo from "./botinfo";
import forceAddMembers from "./forceAddMembers";
import role from "./role";
import { help } from './help'

// TODO: Comments on Utility commands
export default category("Utility", "Commands that help with the utility side of the server", [
  botinfo,
  role,
  forceAddMembers,
  help,
]);