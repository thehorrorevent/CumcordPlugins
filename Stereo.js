// 101% not Afys Stereo plugin

import { after } from "@cumcord/patcher";
import { findByPrototypes } from "@cumcord/modules/webpack";

export default () => {
  let voiceModule = findByPrototypes("setSelfDeaf");
  let voicePatch;

  return {
    onLoad() {
      voicePatch = after("initialize", voiceModule.prototype, function(args, resp){
        const setTransportOptions = this.conn.setTransportOptions;
        this.conn.setTransportOptions = function (obj) {
          if (obj.audioEncoder) {
            obj.audioEncoder.params = {
              stereo: "2",
            }
            obj.audioEncoder.channels = 2;
          }
          if (obj.fec) {
            obj.fec = false;
          };
        //  if (obj.encodingVoiceBitRate < 960000) {
         //     obj.encodingVoiceBitRate = 398000;
         // }
          return setTransportOptions.call(this, obj);
        }
      })
    },
    onUnload() {
      voicePatch();
    }
  }
};