// 101% not Afys Stereo plugin then modified

import { after } from "@cumcord/patcher";
import { findByUniqueProperties } from "@cumcord/modules/webpack";

export default () => {
  let VoiceEngine = findByUniqueProperties('getVoiceEngine')
  let VoiceConnection = VoiceEngine.VoiceConnection
  let StereoSound;

  return {
    onLoad() {

        StereoSound = after('initialize', VoiceEngine.getVoiceEngine, function(args, resp){
            class Stereo extends VoiceConnection {
                constructor(a,b,c,d,e,f,g) {
                    super(a,b,c,d,e,f,g);
                    this.origin = super.setTransportOptions;
                    super.setRemoteUserCanHavePriority(Client, true)
                }
                setTransportOptions(obj) {
                    obj.attenuation = true;
                    obj.attenuateWhileSpeakingSelf = true;
                    obj.attenuateWhileSpeakingOthers = false;
                    obj.attenuationFactor = 200;
                    obj.prioritySpeakerDucking = 0;

                    if (obj.audioEncoder) {
                        obj.audioEncoder.channels = 8;
                        obj.audioEncoder.freq = 96000;
                        obj.audioEncoder.rate = 910000
                    }
                    if (obj.fec) {
                        obj.fec = false
                    }
                    if (obj.encodingVoiceBitRate) {
                        obj.encodingVoiceBitRate = 960000;
                    }
                    this.origin(obj)
                    window.sound = this;
                    return this.setTransportOptions(this, obj)
                }
            }
        })
    },
    onUnload() {
      StereoSound();
    }
  }
};