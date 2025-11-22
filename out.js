// Copyright 2010 The Emscripten Authors.  All rights reserved.
// Emscripten is available under two separate licenses, the MIT license and the
// University of Illinois/NCSA Open Source License.  Both these licenses can be
// found in the LICENSE file.

// The Module object: Our interface to the outside world. We import
// and export values on it. There are various ways Module can be used:
// 1. Not defined. We create it here
// 2. A function parameter, function(Module) { ..generated code.. }
// 3. pre-run appended it, var Module = {}; ..generated code..
// 4. External script tag defines var Module.
// We need to check if Module already exists (e.g. case 3 above).
// Substitution will be replaced with actual code on later stage of the build,
// this way Closure Compiler will not mangle it (e.g. case 4. above).
// Note that if you want to run closure, and also to use Module
// after the generated code, you will need to define   var Module = {};
// before the code. Then that object will be used in the code, and you
// can continue to use Module afterwards as well.
var Module = typeof Module !== 'undefined' ? Module : {};

// --pre-jses are emitted after the Module integration code, so that they can
// refer to Module (if they choose; they can also define Module)
function initfs() {
    FS.mkdir('/assets');
    FS.mount(IDBFS, {}, '/assets');

    let preload = [
        "assets/audio.bag",
        "assets/audio.idx",
        "assets/default.cfg",
        "assets/gamedata.bin",
        "assets/large.fnt",
        "assets/mapcycle.txt",
        "assets/monster.bin",
        "assets/Modifier.bin",
        "assets/number.fnt",
        "assets/OTQuest.rul",
        "assets/small.fnt",
        "assets/Save",
        "assets/SoundSet.bin",
        "assets/thing.bin",
        "assets/video.bag.0",
        "assets/video.bag.1",
        "assets/video.bag.2",
        "assets/video.bag.3",
        "assets/video.bag.4",
        "assets/video.bag.5",
        "assets/video.bag.6",
        "assets/video.bag.7",
        "assets/video.idx",
        "assets/window",
        "assets/window/access.wnd",
        "assets/window/advanced.wnd",
        "assets/window/advidop2.wnd",
        "assets/window/advidopt.wnd",
        "assets/window/advserv.wnd",
        "assets/window/ArnaMain.wnd",
        "assets/window/audtest.wnd",
        "assets/window/Briefing.wnd",
        "assets/window/chared2.wnd",
        "assets/window/charedit.wnd",
        "assets/window/conninfo.wnd",
        "assets/window/conntype.wnd",
        "assets/window/Dialog.wnd",
        "assets/window/discon.wnd",
        "assets/window/dlg.wnd",
        "assets/window/filters.wnd",
        "assets/window/filter.wnd",
        "assets/window/gamesel.wnd",
        "assets/window/gameset.wnd",
        "assets/window/general.wnd",
        "assets/window/GGOver.wnd",
        "assets/window/GuiChat.wnd",
        "assets/window/GUI_CTF.wnd",
        "assets/window/gui_fb.wnd",
        "assets/window/GuiFps.wnd",
        "assets/window/GuiKick.wnd",
        "assets/window/identify.wnd",
        "assets/window/InputCfg.wnd",
        "assets/window/journal.wnd",
        "assets/window/laccess.wnd",
        "assets/window/ladvserv.wnd",
        "assets/window/ldlg.wnd",
        "assets/window/legal.wnd",
        "assets/window/lgeneral.wnd",
        "assets/window/load.wnd",
        "assets/window/locale.wnd",
        "assets/window/lplayers.wnd",
        "assets/window/lsanchlp.wnd",
        "assets/window/lservopt.wnd",
        "assets/window/lwadvsrv.wnd",
        "assets/window/lwgenerl.wnd",
        "assets/window/MainBG.wnd",
        "assets/window/MainMenu.wnd",
        "assets/window/mapdnld.wnd",
        "assets/window/modify.wnd",
        "assets/window/motd.wnd",
        "assets/window/multiopt.wnd",
        "assets/window/MultMove.wnd",
        "assets/window/noxgamex.wnd",
        "assets/window/noxworld.wnd",
        "assets/window/objlst.wnd",
        "assets/window/Options.wnd",
        "assets/window/OptsBack.wnd",
        "assets/window/players.wnd",
        "assets/window/playrlst.wnd",
        "assets/window/proxlist.wnd",
        "assets/window/QuitMenu.wnd",
        "assets/window/recplay.wnd",
        "assets/window/rulelist.wnd",
        "assets/window/rules.wnd",
        "assets/window/sanchlp.wnd",
        "assets/window/save.wnd",
        "assets/window/SelChar.wnd",
        "assets/window/SelClass.wnd",
        "assets/window/SelColor.wnd",
        "assets/window/SERVLIST.WND",
        "assets/window/servopts.wnd",
        "assets/window/Shop.wnd",
        "assets/window/SKey.wnd",
        "assets/window/spelllst.wnd",
        "assets/window/Trade.wnd",
        "assets/window/videoopt.wnd",
        "assets/window/wAccess.wnd",
        "assets/window/wAdvServ.wnd",
        "assets/window/wGeneral.wnd",
        "assets/window/wolapi.wnd",
        "assets/window/wolchan.wnd",
        "assets/window/wolchat.wnd",
        "assets/window/woldisc.wnd",
        "assets/window/wolfind.wnd",
        "assets/window/wolopt.wnd",
        "assets/window/wolprog.wnd",
        "assets/window/wolreg.wnd",
        "assets/window/wServopt.wnd",
        "assets/window/yesno.wnd",
        "assets/maps",
        "assets/maps/con01a",
        "assets/maps/con01a/con01a.map",
        "assets/maps/con02a",
        "assets/maps/con02a/con02a.map",
        "assets/maps/con03a",
        "assets/maps/con03a/con03a.map",
        "assets/maps/con03b",
        "assets/maps/con03b/con03b.map",
        "assets/maps/con04a",
        "assets/maps/con04a/con04a.map",
        "assets/maps/con04b",
        "assets/maps/con04b/con04b.map",
        "assets/maps/con04c",
        "assets/maps/con04c/con04c.map",
        "assets/maps/con05a",
        "assets/maps/con05a/con05a.map",
        "assets/maps/con05b",
        "assets/maps/con05b/con05b.map",
        "assets/maps/con05c",
        "assets/maps/con05c/con05c.map",
        "assets/maps/con06a",
        "assets/maps/con06a/con06a.map",
        "assets/maps/con06b",
        "assets/maps/con06b/con06b.map",
        "assets/maps/con07a",
        "assets/maps/con07a/con07a.map",
        "assets/maps/con07b",
        "assets/maps/con07b/con07b.map",
        "assets/maps/con07c",
        "assets/maps/con07c/con07c.map",
        "assets/maps/con07d",
        "assets/maps/con07d/con07d.map",
        "assets/maps/con07e",
        "assets/maps/con07e/con07e.map",
        "assets/maps/con07f",
        "assets/maps/con07f/con07f.map",
        "assets/maps/con07g",
        "assets/maps/con07g/con07g.map",
        "assets/maps/con07h",
        "assets/maps/con07h/con07h.map",
        "assets/maps/con08a",
        "assets/maps/con08a/con08a.map",
        "assets/maps/con08b",
        "assets/maps/con08b/con08b.map",
        "assets/maps/con08c",
        "assets/maps/con08c/con08c.map",
        "assets/maps/con08d",
        "assets/maps/con08d/con08d.map",
        "assets/maps/con08e",
        "assets/maps/con08e/con08e.map",
        "assets/maps/con09a",
        "assets/maps/con09a/con09a.map",
        "assets/maps/con09b",
        "assets/maps/con09b/con09b.map",
        "assets/maps/con09c",
        "assets/maps/con09c/con09c.map",
        "assets/maps/con09d",
        "assets/maps/con09d/con09d.map",
        "assets/maps/con10a",
        "assets/maps/con10a/con10a.map",
        "assets/maps/con10b",
        "assets/maps/con10b/con10b.map",
        "assets/maps/con10c",
        "assets/maps/con10c/con10c.map",
        "assets/maps/con10d",
        "assets/maps/con10d/con10d.map",
        "assets/maps/con11a",
        "assets/maps/con11a/con11a.map",
        "assets/maps/Estate",
        "assets/maps/Estate/Estate.map",
        "assets/maps/Estate/Estate.nxz",
        "assets/maps/Estate/Estate.rul",
        "assets/maps/G_CastlD",
        "assets/maps/G_CastlD/G_CastlD.map",
        "assets/maps/G_CastlD/G_CastlD.nxz",
        "assets/maps/G_Castle",
        "assets/maps/G_Castle/G_Castle.map",
        "assets/maps/G_Castle/G_Castle.nxz",
        "assets/maps/G_CryptD",
        "assets/maps/G_CryptD/G_CryptD.map",
        "assets/maps/G_CryptD/G_CryptD.nxz",
        "assets/maps/G_Crypts",
        "assets/maps/G_Crypts/G_Crypts.map",
        "assets/maps/G_Crypts/G_Crypts.nxz",
        "assets/maps/G_ForesD",
        "assets/maps/G_ForesD/G_ForesD.map",
        "assets/maps/G_ForesD/G_ForesD.nxz",
        "assets/maps/G_Forest",
        "assets/maps/G_Forest/G_Forest.map",
        "assets/maps/G_Forest/G_Forest.nxz",
        "assets/maps/G_Lava",
        "assets/maps/G_Lava/G_Lava.map",
        "assets/maps/G_Lava/G_Lava.nxz",
        "assets/maps/G_LOTD",
        "assets/maps/G_LOTD/G_LOTD.map",
        "assets/maps/G_LOTD/G_LOTD.nxz",
        "assets/maps/G_LOTDD",
        "assets/maps/G_LOTDD/G_LOTDD.map",
        "assets/maps/G_LOTDD/G_LOTDD.nxz",
        "assets/maps/G_Mines",
        "assets/maps/G_Mines/G_Mines.map",
        "assets/maps/G_Mines/G_Mines.nxz",
        "assets/maps/G_Swamp",
        "assets/maps/G_Swamp/G_Swamp.map",
        "assets/maps/G_Swamp/G_Swamp.nxz",
        "assets/maps/G_TemplD",
        "assets/maps/G_TemplD/G_TemplD.map",
        "assets/maps/G_TemplD/G_TemplD.nxz",
        "assets/maps/G_Temple",
        "assets/maps/G_Temple/G_Temple.map",
        "assets/maps/G_Temple/G_Temple.nxz",
        "assets/maps/So_Beach",
        "assets/maps/So_Beach/So_Beach.map",
        "assets/maps/So_Beach/So_Beach.nxz",
        "assets/maps/So_Brin",
        "assets/maps/So_Brin/So_Brin.map",
        "assets/maps/So_Brin/So_Brin.nxz",
        "assets/maps/So_Druid",
        "assets/maps/So_Druid/So_Druid.map",
        "assets/maps/So_Druid/So_Druid.nxz",
        "assets/maps/So_Dun",
        "assets/maps/So_Dun/So_Dun.map",
        "assets/maps/So_Dun/So_Dun.nxz",
        "assets/maps/So_FOV",
        "assets/maps/So_FOV/So_FOV.map",
        "assets/maps/So_FOV/So_FOV.nxz",
        "assets/maps/So_Galav",
        "assets/maps/So_Galav/So_Galav.map",
        "assets/maps/So_Galav/So_Galav.nxz",
        "assets/maps/So_Grok",
        "assets/maps/So_Grok/So_Grok.map",
        "assets/maps/So_Grok/So_Grok.nxz",
        "assets/maps/So_Ix",
        "assets/maps/So_Ix/So_Ix.map",
        "assets/maps/So_Ix/So_Ix.nxz",
        "assets/maps/So_LOD",
        "assets/maps/So_LOD/So_LOD.map",
        "assets/maps/So_LOD/So_LOD.nxz",
        "assets/maps/So_Mines",
        "assets/maps/So_Mines/So_Mines.map",
        "assets/maps/So_Mines/So_Mines.nxz",
        "assets/maps/So_Mount",
        "assets/maps/So_Mount/So_Mount.map",
        "assets/maps/So_Mount/So_Mount.nxz",
        "assets/maps/So_Open",
        "assets/maps/So_Open/So_Open.map",
        "assets/maps/So_Open/So_Open.nxz",
        "assets/maps/So_Swamp",
        "assets/maps/So_Swamp/So_Swamp.map",
        "assets/maps/So_Swamp/So_Swamp.nxz",
        "assets/maps/So_Waste",
        "assets/maps/So_Waste/So_Waste.map",
        "assets/maps/So_Waste/So_Waste.nxz",
        "assets/maps/So_Woods",
        "assets/maps/So_Woods/So_Woods.map",
        "assets/maps/So_Woods/So_Woods.nxz",
        "assets/maps/war01a",
        "assets/maps/war01a/war01a.map",
        "assets/maps/war02a",
        "assets/maps/war02a/war02a.map",
        "assets/maps/war02b",
        "assets/maps/war02b/war02b.map",
        "assets/maps/war03a",
        "assets/maps/war03a/war03a.map",
        "assets/maps/war03b",
        "assets/maps/war03b/war03b.map",
        "assets/maps/war03c",
        "assets/maps/war03c/war03c.map",
        "assets/maps/war03d",
        "assets/maps/war03d/war03d.map",
        "assets/maps/war04a",
        "assets/maps/war04a/war04a.map",
        "assets/maps/war04b",
        "assets/maps/war04b/war04b.map",
        "assets/maps/war04c",
        "assets/maps/war04c/war04c.map",
        "assets/maps/war05a",
        "assets/maps/war05a/war05a.map",
        "assets/maps/war05b",
        "assets/maps/war05b/war05b.map",
        "assets/maps/war05c",
        "assets/maps/war05c/war05c.map",
        "assets/maps/war06a",
        "assets/maps/war06a/war06a.map",
        "assets/maps/war06b",
        "assets/maps/war06b/war06b.map",
        "assets/maps/war07a",
        "assets/maps/war07a/war07a.map",
        "assets/maps/war07b",
        "assets/maps/war07b/war07b.map",
        "assets/maps/war07c",
        "assets/maps/war07c/war07c.map",
        "assets/maps/war07d",
        "assets/maps/war07d/war07d.map",
        "assets/maps/war07e",
        "assets/maps/war07e/war07e.map",
        "assets/maps/war07f",
        "assets/maps/war07f/war07f.map",
        "assets/maps/war07g",
        "assets/maps/war07g/war07g.map",
        "assets/maps/war07h",
        "assets/maps/war07h/war07h.map",
        "assets/maps/war08a",
        "assets/maps/war08a/war08a.map",
        "assets/maps/war08b",
        "assets/maps/war08b/war08b.map",
        "assets/maps/war08c",
        "assets/maps/war08c/war08c.map",
        "assets/maps/war08d",
        "assets/maps/war08d/war08d.map",
        "assets/maps/war08e",
        "assets/maps/war08e/war08e.map",
        "assets/maps/war09a",
        "assets/maps/war09a/war09a.map",
        "assets/maps/war09b",
        "assets/maps/war09b/war09b.map",
        "assets/maps/war09c",
        "assets/maps/war09c/war09c.map",
        "assets/maps/war09d",
        "assets/maps/war09d/war09d.map",
        "assets/maps/war10a",
        "assets/maps/war10a/war10a.map",
        "assets/maps/war10b",
        "assets/maps/war10b/war10b.map",
        "assets/maps/war10c",
        "assets/maps/war10c/war10c.map",
        "assets/maps/war10d",
        "assets/maps/war10d/war10d.map",
        "assets/maps/war11a",
        "assets/maps/war11a/war11a.map",
        "assets/maps/wiz01a",
        "assets/maps/wiz01a/wiz01a.map",
        "assets/maps/wiz02a",
        "assets/maps/wiz02a/wiz02a.map",
        "assets/maps/wiz02b",
        "assets/maps/wiz02b/wiz02b.map",
        "assets/maps/wiz02c",
        "assets/maps/wiz02c/wiz02c.map",
        "assets/maps/wiz03a",
        "assets/maps/wiz03a/wiz03a.map",
        "assets/maps/wiz03b",
        "assets/maps/wiz03b/wiz03b.map",
        "assets/maps/wiz03c",
        "assets/maps/wiz03c/wiz03c.map",
        "assets/maps/wiz04a",
        "assets/maps/wiz04a/wiz04a.map",
        "assets/maps/wiz04b",
        "assets/maps/wiz04b/wiz04b.map",
        "assets/maps/wiz04c",
        "assets/maps/wiz04c/wiz04c.map",
        "assets/maps/wiz05a",
        "assets/maps/wiz05a/wiz05a.map",
        "assets/maps/wiz05b",
        "assets/maps/wiz05b/wiz05b.map",
        "assets/maps/wiz05c",
        "assets/maps/wiz05c/wiz05c.map",
        "assets/maps/wiz06a",
        "assets/maps/wiz06a/wiz06a.map",
        "assets/maps/wiz06b",
        "assets/maps/wiz06b/wiz06b.map",
        "assets/maps/wiz06c",
        "assets/maps/wiz06c/wiz06c.map",
        "assets/maps/wiz07a",
        "assets/maps/wiz07a/wiz07a.map",
        "assets/maps/wiz07b",
        "assets/maps/wiz07b/wiz07b.map",
        "assets/maps/wiz07c",
        "assets/maps/wiz07c/wiz07c.map",
        "assets/maps/wiz07d",
        "assets/maps/wiz07d/wiz07d.map",
        "assets/maps/wiz07e",
        "assets/maps/wiz07e/wiz07e.map",
        "assets/maps/wiz07f",
        "assets/maps/wiz07f/wiz07f.map",
        "assets/maps/wiz08a",
        "assets/maps/wiz08a/wiz08a.map",
        "assets/maps/wiz08b",
        "assets/maps/wiz08b/wiz08b.map",
        "assets/maps/wiz08c",
        "assets/maps/wiz08c/wiz08c.map",
        "assets/maps/wiz08d",
        "assets/maps/wiz08d/wiz08d.map",
        "assets/maps/wiz08e",
        "assets/maps/wiz08e/wiz08e.map",
        "assets/maps/wiz09a",
        "assets/maps/wiz09a/wiz09a.map",
        "assets/maps/wiz09b",
        "assets/maps/wiz09b/wiz09b.map",
        "assets/maps/wiz09c",
        "assets/maps/wiz09c/wiz09c.map",
        "assets/maps/wiz09d",
        "assets/maps/wiz09d/wiz09d.map",
        "assets/maps/wiz10a",
        "assets/maps/wiz10a/wiz10a.map",
        "assets/maps/wiz10b",
        "assets/maps/wiz10b/wiz10b.map",
        "assets/maps/wiz10c",
        "assets/maps/wiz10c/wiz10c.map",
        "assets/maps/wiz10d",
        "assets/maps/wiz10d/wiz10d.map",
        "assets/maps/wiz11a",
        "assets/maps/wiz11a/wiz11a.map",
        "assets/maps/beneath",
        "assets/maps/beneath/beneath.map",
        "assets/maps/beneath/beneath.nxz",
        "assets/en",
        "assets/ko",
        "assets/en/default.fnt",
        "assets/en/nox.csf",
        "assets/ko/default.fnt",
        "assets/ko/nox.csf",
    ];
    addRunDependency('syncfs');
    FS.syncfs(true, function (err) {
        preload.forEach(function (path) {
            try {
                if (FS.lookupPath(path).node)
                    return;
            } catch (err) {
            }
            if (!path.includes('.'))
                FS.mkdir(path, 0777);
            else
                FS.createPreloadedFile(path, null, path, true, true);
        });
        removeRunDependency('syncfs');
    });
}
Module.preRun = [initfs];

function atou8(data) {
    return new Uint8Array(atob(data).split('').map(function (c) { return c.charCodeAt(0) }))
}
function u8toa(data) {
    return btoa(String.fromCharCode.apply(null, data))
}
class Network {
    constructor(options) {
        this.options = options
        this.peers = {}
        this.recvQueue = {}
        this.state = null

        const onclose = () => {
            this.ws = null
            setTimeout(connect, 5000)
        }
        const onmessage = ({ data }) => {
            this.onmessage(JSON.parse(data))
        }
        const onopen = () => this.onopen()
        const connect = () => {
            const ws = this.ws = new WebSocket(options.url)
            ws.addEventListener('open', onopen)
            ws.addEventListener('close', onclose)
            ws.addEventListener('message', onmessage)
        }
        connect()
    }

    isready () {
        return this.ws !== null && this.ws.readyState == this.ws.OPEN
    }

    onopen () {
    }

    onmessage (data) {
        switch (data.type) {
            case 'ACCEPT': {
                const peer = this.peers[data.remote]
                peer.connection.setRemoteDescription(data.answer)
                break
            }
            case 'CONNECT': {
                const remote = data.remote
                const peerConnection = new RTCPeerConnection(this.options.webrtc)
                const peerChannel = peerConnection.createDataChannel('nox-game', {
                    negotiated: true,
                    id: 0
                })
                peerChannel.binaryType = 'arraybuffer'
                peerConnection.addEventListener('icecandidate', ({ candidate }) => {
                    if (candidate) {
                        this.isready() && this.ws.send(JSON.stringify({
                            type: 'ICECANDIDATE',
                            remote,
                            candidate
                        }))
                    }
                })
                peerConnection.addEventListener('iceconnectionstatechange', function () {
                    console.log(peerConnection.iceConnectionState)
                })
                peerConnection.setRemoteDescription(data.offer)
                peerConnection.createAnswer().then((answer) => {
                    peerConnection.setLocalDescription(answer)
                    this.accept(remote, answer)
                    peerChannel.addEventListener('message', ({ data }) => this.onpacket(remote, data))
                })
                this.peers[remote] = {
                    id: remote,
                    connection: peerConnection,
                    channel: peerChannel
                }
                break
            }
            case 'ICECANDIDATE': {
                const peer = this.peers[data.remote]
                peer.connection.addIceCandidate(new RTCIceCandidate(data.candidate))
                break
            }
            case 'LIST': {
                for (let i = 0; i < data.servers.length; i++) {
                    this.recvQueue[data.port].push({
                        id: data.servers[i].id,
                        srcport: data.servers[i].port,
                        data: this.updateListSeq(data.seqnum, atou8(data.servers[i].data))
                    })
                }
                break
            }
        }
    }

    onpacket(id, data) {
        data = new Uint8Array(data);
        const srcport = (data[0] << 8) | data[1];
        const dstport = (data[2] << 8) | data[3];
        if (this.recvQueue[dstport] === undefined)
            this.recvQueue[dstport] = []
        this.recvQueue[dstport].push({ id, srcport, data: data.subarray(4) })
    }

    updateListSeq (seqnum, data) {
        data[44] = seqnum >> 0
        data[45] = seqnum >> 8
        data[46] = seqnum >> 16
        data[47] = seqnum >> 24
        return data
    }

    listServers (seqnum, port) {
        this.ws.send(JSON.stringify({
            type: 'LIST',
            seqnum,
            port
        }))
    }

    registerServer (data) {
        this.ws.send(JSON.stringify({
            type: 'REGISTER',
            data: data ? u8toa(data) : null,
            port: this.lastDestPort
        }))
    }

    accept (remote, answer) {
        this.isready() && this.ws.send(JSON.stringify({
            type: 'ACCEPT',
            remote,
            answer
        }))
    }

    bind (destport) {
        // XXX HACK
        this.lastDestPort = destport

        this.recvQueue[destport] = []
    }

    connect (remote) {
        const peerConnection = new RTCPeerConnection(this.options.webrtc)
        const peerChannel = peerConnection.createDataChannel('nox-game', {
            negotiated: true,
            id: 0
        })
        peerChannel.binaryType = 'arraybuffer'
        peerChannel.addEventListener('message', ({ data }) => this.onpacket(remote, data))
        peerConnection.addEventListener('icecandidate', ({ candidate }) => {
            if (candidate) {
                this.isready() && this.ws.send(JSON.stringify({
                    type: 'ICECANDIDATE',
                    remote,
                    candidate
                }))
            }
        })
        peerChannel.addEventListener('open', () => {
            clearTimeout(timer)
            const peer = this.peers[remote]
            peer.channel = peerChannel
            for (let i = 0; i < peer.sendQueue.length; i++)
                peer.channel.send(peer.sendQueue[i])
            peer.sendQueue = null
        })
        peerConnection.createOffer().then((offer) => {
            peerConnection.setLocalDescription(offer)
            this.isready() && this.ws.send(JSON.stringify({
               type: 'CONNECT',
               remote,
               offer
            }))
        })
        this.peers[remote] = {
            id: remote,
            connection: peerConnection,
            channel: null,
            sendQueue: []
        }
        let timer = setTimeout(() => {
            console.log('Peer connection timed out.')
            delete this.peers[remote]
            peerChannel.close()
            peerConnection.close()
        }, 5000)
    }

    close () {
    }

    available (destport) {
        if (this.recvQueue[destport] === undefined)
            this.recvQueue[destport] = []
        if (!this.recvQueue[destport].length)
            return 0
        return this.recvQueue[destport][0].data.length
    }

    recvfrom (destport) {
        if (this.recvQueue[destport] === undefined)
            this.recvQueue[destport] = []
        if (!this.recvQueue[destport].length)
            return null, null
        const { id, srcport, data } = this.recvQueue[destport].shift()
        return [id, srcport, data]
    }

    sendto (srcport, id, destport, data) {
        data = Uint8Array.of(srcport >> 8, srcport, destport >> 8, destport, ...data)
        if (!this.peers[id])
            this.connect(id)

        const peer = this.peers[id]
        if (peer.channel)
            this.peers[id].channel.send(data)
        else
            peer.sendQueue.push(data)
    }
}

network = new Network({
    url: document.location.protocol.replace('http', 'ws') + '//' + document.location.host,
    webrtc: {
        iceServers: [
            { urls: "stun:stun.l.google.com:19302" }
        ]
    }
})



// Sometimes an existing Module object exists with properties
// meant to overwrite the default module functionality. Here
// we collect those properties and reapply _after_ we configure
// the current environment's defaults to avoid having to be so
// defensive during initialization.
var moduleOverrides = {};
var key;
for (key in Module) {
  if (Module.hasOwnProperty(key)) {
    moduleOverrides[key] = Module[key];
  }
}

Module['arguments'] = [];
Module['thisProgram'] = './this.program';
Module['quit'] = function(status, toThrow) {
  throw toThrow;
};
Module['preRun'] = [];
Module['postRun'] = [];

// Determine the runtime environment we are in. You can customize this by
// setting the ENVIRONMENT setting at compile time (see settings.js).

var ENVIRONMENT_IS_WEB = false;
var ENVIRONMENT_IS_WORKER = false;
var ENVIRONMENT_IS_NODE = false;
var ENVIRONMENT_IS_SHELL = false;
ENVIRONMENT_IS_WEB = typeof window === 'object';
ENVIRONMENT_IS_WORKER = typeof importScripts === 'function';
ENVIRONMENT_IS_NODE = typeof process === 'object' && typeof require === 'function' && !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_WORKER;
ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;

if (Module['ENVIRONMENT']) {
  throw new Error('Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -s ENVIRONMENT=web or -s ENVIRONMENT=node)');
}


// Three configurations we can be running in:
// 1) We could be the application main() thread running in the main JS UI thread. (ENVIRONMENT_IS_WORKER == false and ENVIRONMENT_IS_PTHREAD == false)
// 2) We could be the application main() thread proxied to worker. (with Emscripten -s PROXY_TO_WORKER=1) (ENVIRONMENT_IS_WORKER == true, ENVIRONMENT_IS_PTHREAD == false)
// 3) We could be an application pthread running in a worker. (ENVIRONMENT_IS_WORKER == true and ENVIRONMENT_IS_PTHREAD == true)




// `/` should be present at the end if `scriptDirectory` is not empty
var scriptDirectory = '';
function locateFile(path) {
  if (Module['locateFile']) {
    return Module['locateFile'](path, scriptDirectory);
  } else {
    return scriptDirectory + path;
  }
}

if (ENVIRONMENT_IS_NODE) {
  scriptDirectory = __dirname + '/';

  // Expose functionality in the same simple way that the shells work
  // Note that we pollute the global namespace here, otherwise we break in node
  var nodeFS;
  var nodePath;

  Module['read'] = function shell_read(filename, binary) {
    var ret;
      if (!nodeFS) nodeFS = require('fs');
      if (!nodePath) nodePath = require('path');
      filename = nodePath['normalize'](filename);
      ret = nodeFS['readFileSync'](filename);
    return binary ? ret : ret.toString();
  };

  Module['readBinary'] = function readBinary(filename) {
    var ret = Module['read'](filename, true);
    if (!ret.buffer) {
      ret = new Uint8Array(ret);
    }
    assert(ret.buffer);
    return ret;
  };

  if (process['argv'].length > 1) {
    Module['thisProgram'] = process['argv'][1].replace(/\\/g, '/');
  }

  Module['arguments'] = process['argv'].slice(2);

  if (typeof module !== 'undefined') {
    module['exports'] = Module;
  }

  process['on']('uncaughtException', function(ex) {
    // suppress ExitStatus exceptions from showing an error
    if (!(ex instanceof ExitStatus)) {
      throw ex;
    }
  });
  // Currently node will swallow unhandled rejections, but this behavior is
  // deprecated, and in the future it will exit with error status.
  process['on']('unhandledRejection', abort);

  Module['quit'] = function(status) {
    process['exit'](status);
  };

  Module['inspect'] = function () { return '[Emscripten Module object]'; };
} else
if (ENVIRONMENT_IS_SHELL) {


  if (typeof read != 'undefined') {
    Module['read'] = function shell_read(f) {
      return read(f);
    };
  }

  Module['readBinary'] = function readBinary(f) {
    var data;
    if (typeof readbuffer === 'function') {
      return new Uint8Array(readbuffer(f));
    }
    data = read(f, 'binary');
    assert(typeof data === 'object');
    return data;
  };

  if (typeof scriptArgs != 'undefined') {
    Module['arguments'] = scriptArgs;
  } else if (typeof arguments != 'undefined') {
    Module['arguments'] = arguments;
  }

  if (typeof quit === 'function') {
    Module['quit'] = function(status) {
      quit(status);
    }
  }
} else
if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
  if (ENVIRONMENT_IS_WORKER) { // Check worker, not web, since window could be polyfilled
    scriptDirectory = self.location.href;
  } else if (document.currentScript) { // web
    scriptDirectory = document.currentScript.src;
  }
  // blob urls look like blob:http://site.com/etc/etc and we cannot infer anything from them.
  // otherwise, slice off the final part of the url to find the script directory.
  // if scriptDirectory does not contain a slash, lastIndexOf will return -1,
  // and scriptDirectory will correctly be replaced with an empty string.
  if (scriptDirectory.indexOf('blob:') !== 0) {
    scriptDirectory = scriptDirectory.substr(0, scriptDirectory.lastIndexOf('/')+1);
  } else {
    scriptDirectory = '';
  }


  Module['read'] = function shell_read(url) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, false);
      xhr.send(null);
      return xhr.responseText;
  };

  if (ENVIRONMENT_IS_WORKER) {
    Module['readBinary'] = function readBinary(url) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.responseType = 'arraybuffer';
        xhr.send(null);
        return new Uint8Array(xhr.response);
    };
  }

  Module['readAsync'] = function readAsync(url, onload, onerror) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function xhr_onload() {
      if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
        onload(xhr.response);
        return;
      }
      onerror();
    };
    xhr.onerror = onerror;
    xhr.send(null);
  };

  Module['setWindowTitle'] = function(title) { document.title = title };
} else
{
  throw new Error('environment detection error');
}

// Set up the out() and err() hooks, which are how we can print to stdout or
// stderr, respectively.
// If the user provided Module.print or printErr, use that. Otherwise,
// console.log is checked first, as 'print' on the web will open a print dialogue
// printErr is preferable to console.warn (works better in shells)
// bind(console) is necessary to fix IE/Edge closed dev tools panel behavior.
var out = Module['print'] || (typeof console !== 'undefined' ? console.log.bind(console) : (typeof print !== 'undefined' ? print : null));
var err = Module['printErr'] || (typeof printErr !== 'undefined' ? printErr : ((typeof console !== 'undefined' && console.warn.bind(console)) || out));

// Merge back in the overrides
for (key in moduleOverrides) {
  if (moduleOverrides.hasOwnProperty(key)) {
    Module[key] = moduleOverrides[key];
  }
}
// Free the object hierarchy contained in the overrides, this lets the GC
// reclaim data used e.g. in memoryInitializerRequest, which is a large typed array.
moduleOverrides = undefined;

// perform assertions in shell.js after we set up out() and err(), as otherwise if an assertion fails it cannot print the message
assert(typeof Module['memoryInitializerPrefixURL'] === 'undefined', 'Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['pthreadMainPrefixURL'] === 'undefined', 'Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['cdInitializerPrefixURL'] === 'undefined', 'Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['filePackagePrefixURL'] === 'undefined', 'Module.filePackagePrefixURL option was removed, use Module.locateFile instead');



// Copyright 2017 The Emscripten Authors.  All rights reserved.
// Emscripten is available under two separate licenses, the MIT license and the
// University of Illinois/NCSA Open Source License.  Both these licenses can be
// found in the LICENSE file.

// {{PREAMBLE_ADDITIONS}}

var STACK_ALIGN = 16;

// stack management, and other functionality that is provided by the compiled code,
// should not be used before it is ready
stackSave = stackRestore = stackAlloc = function() {
  abort('cannot use the stack before compiled code is ready to run, and has provided stack access');
};

function staticAlloc(size) {
  abort('staticAlloc is no longer available at runtime; instead, perform static allocations at compile time (using makeStaticAlloc)');
}

function dynamicAlloc(size) {
  assert(DYNAMICTOP_PTR);
  var ret = HEAP32[DYNAMICTOP_PTR>>2];
  var end = (ret + size + 15) & -16;
  if (end <= _emscripten_get_heap_size()) {
    HEAP32[DYNAMICTOP_PTR>>2] = end;
  } else {
    return 0;
  }
  return ret;
}

function alignMemory(size, factor) {
  if (!factor) factor = STACK_ALIGN; // stack alignment (16-byte) by default
  return Math.ceil(size / factor) * factor;
}

function getNativeTypeSize(type) {
  switch (type) {
    case 'i1': case 'i8': return 1;
    case 'i16': return 2;
    case 'i32': return 4;
    case 'i64': return 8;
    case 'float': return 4;
    case 'double': return 8;
    default: {
      if (type[type.length-1] === '*') {
        return 4; // A pointer
      } else if (type[0] === 'i') {
        var bits = parseInt(type.substr(1));
        assert(bits % 8 === 0, 'getNativeTypeSize invalid bits ' + bits + ', type ' + type);
        return bits / 8;
      } else {
        return 0;
      }
    }
  }
}

function warnOnce(text) {
  if (!warnOnce.shown) warnOnce.shown = {};
  if (!warnOnce.shown[text]) {
    warnOnce.shown[text] = 1;
    err(text);
  }
}

var asm2wasmImports = { // special asm2wasm imports
    "f64-rem": function(x, y) {
        return x % y;
    },
    "debugger": function() {
        debugger;
    }
};





// Wraps a JS function as a wasm function with a given signature.
// In the future, we may get a WebAssembly.Function constructor. Until then,
// we create a wasm module that takes the JS function as an import with a given
// signature, and re-exports that as a wasm function.
function convertJsFunctionToWasm(func, sig) {
  // The module is static, with the exception of the type section, which is
  // generated based on the signature passed in.
  var typeSection = [
    0x01, // id: section,
    0x00, // length: 0 (placeholder)
    0x01, // count: 1
    0x60, // form: func
  ];
  var sigRet = sig.slice(0, 1);
  var sigParam = sig.slice(1);
  var typeCodes = {
    'i': 0x7f, // i32
    'j': 0x7e, // i64
    'f': 0x7d, // f32
    'd': 0x7c, // f64
  };

  // Parameters, length + signatures
  typeSection.push(sigParam.length);
  for (var i = 0; i < sigParam.length; ++i) {
    typeSection.push(typeCodes[sigParam[i]]);
  }

  // Return values, length + signatures
  // With no multi-return in MVP, either 0 (void) or 1 (anything else)
  if (sigRet == 'v') {
    typeSection.push(0x00);
  } else {
    typeSection = typeSection.concat([0x01, typeCodes[sigRet]]);
  }

  // Write the overall length of the type section back into the section header
  // (excepting the 2 bytes for the section id and length)
  typeSection[1] = typeSection.length - 2;

  // Rest of the module is static
  var bytes = new Uint8Array([
    0x00, 0x61, 0x73, 0x6d, // magic ("\0asm")
    0x01, 0x00, 0x00, 0x00, // version: 1
  ].concat(typeSection, [
    0x02, 0x07, // import section
      // (import "e" "f" (func 0 (type 0)))
      0x01, 0x01, 0x65, 0x01, 0x66, 0x00, 0x00,
    0x07, 0x05, // export section
      // (export "f" (func 0 (type 0)))
      0x01, 0x01, 0x66, 0x00, 0x00,
  ]));

   // We can compile this wasm module synchronously because it is very small.
  // This accepts an import (at "e.f"), that it reroutes to an export (at "f")
  var module = new WebAssembly.Module(bytes);
  var instance = new WebAssembly.Instance(module, {
    e: {
      f: func
    }
  });
  var wrappedFunc = instance.exports.f;
  return wrappedFunc;
}

// Add a wasm function to the table.
function addFunctionWasm(func, sig) {
  var table = wasmTable;
  var ret = table.length;

  // Grow the table
  try {
    table.grow(1);
  } catch (err) {
    if (!err instanceof RangeError) {
      throw err;
    }
    throw 'Unable to grow wasm table. Use a higher value for RESERVED_FUNCTION_POINTERS or set ALLOW_TABLE_GROWTH.';
  }

  // Insert new element
  try {
    // Attempting to call this with JS function will cause of table.set() to fail
    table.set(ret, func);
  } catch (err) {
    if (!err instanceof TypeError) {
      throw err;
    }
    assert(typeof sig !== 'undefined', 'Missing signature argument to addFunction');
    var wrapped = convertJsFunctionToWasm(func, sig);
    table.set(ret, wrapped);
  }

  return ret;
}

function removeFunctionWasm(index) {
  // TODO(sbc): Look into implementing this to allow re-using of table slots
}

// 'sig' parameter is required for the llvm backend but only when func is not
// already a WebAssembly function.
function addFunction(func, sig) {
  if (typeof sig === 'undefined') {
    err('warning: addFunction(): You should provide a wasm function signature string as a second argument. This is not necessary for asm.js and asm2wasm, but can be required for the LLVM wasm backend, so it is recommended for full portability.');
  }



  return addFunctionWasm(func, sig);

}

function removeFunction(index) {

  removeFunctionWasm(index);

}

var funcWrappers = {};

function getFuncWrapper(func, sig) {
  if (!func) return; // on null pointer, return undefined
  assert(sig);
  if (!funcWrappers[sig]) {
    funcWrappers[sig] = {};
  }
  var sigCache = funcWrappers[sig];
  if (!sigCache[func]) {
    // optimize away arguments usage in common cases
    if (sig.length === 1) {
      sigCache[func] = function dynCall_wrapper() {
        return dynCall(sig, func);
      };
    } else if (sig.length === 2) {
      sigCache[func] = function dynCall_wrapper(arg) {
        return dynCall(sig, func, [arg]);
      };
    } else {
      // general case
      sigCache[func] = function dynCall_wrapper() {
        return dynCall(sig, func, Array.prototype.slice.call(arguments));
      };
    }
  }
  return sigCache[func];
}


function makeBigInt(low, high, unsigned) {
  return unsigned ? ((+((low>>>0)))+((+((high>>>0)))*4294967296.0)) : ((+((low>>>0)))+((+((high|0)))*4294967296.0));
}

function dynCall(sig, ptr, args) {
  if (args && args.length) {
    assert(args.length == sig.length-1);
    assert(('dynCall_' + sig) in Module, 'bad function pointer type - no table for sig \'' + sig + '\'');
    return Module['dynCall_' + sig].apply(null, [ptr].concat(args));
  } else {
    assert(sig.length == 1);
    assert(('dynCall_' + sig) in Module, 'bad function pointer type - no table for sig \'' + sig + '\'');
    return Module['dynCall_' + sig].call(null, ptr);
  }
}

var tempRet0 = 0;

var setTempRet0 = function(value) {
  tempRet0 = value;
}

var getTempRet0 = function() {
  return tempRet0;
}

function getCompilerSetting(name) {
  throw 'You must build with -s RETAIN_COMPILER_SETTINGS=1 for getCompilerSetting or emscripten_get_compiler_setting to work';
}

var Runtime = {
  // helpful errors
  getTempRet0: function() { abort('getTempRet0() is now a top-level function, after removing the Runtime object. Remove "Runtime."') },
  staticAlloc: function() { abort('staticAlloc() is now a top-level function, after removing the Runtime object. Remove "Runtime."') },
  stackAlloc: function() { abort('stackAlloc() is now a top-level function, after removing the Runtime object. Remove "Runtime."') },
};

// The address globals begin at. Very low in memory, for code size and optimization opportunities.
// Above 0 is static memory, starting with globals.
// Then the stack.
// Then 'dynamic' memory for sbrk.
var GLOBAL_BASE = 1024;




// === Preamble library stuff ===

// Documentation for the public APIs defined in this file must be updated in:
//    site/source/docs/api_reference/preamble.js.rst
// A prebuilt local version of the documentation is available at:
//    site/build/text/docs/api_reference/preamble.js.txt
// You can also build docs locally as HTML or other formats in site/
// An online HTML version (which may be of a different version of Emscripten)
//    is up at http://kripken.github.io/emscripten-site/docs/api_reference/preamble.js.html


if (typeof WebAssembly !== 'object') {
  abort('No WebAssembly support found. Build with -s WASM=0 to target JavaScript instead.');
}


/** @type {function(number, string, boolean=)} */
function getValue(ptr, type, noSafe) {
  type = type || 'i8';
  if (type.charAt(type.length-1) === '*') type = 'i32'; // pointers are 32-bit
    switch(type) {
      case 'i1': return HEAP8[((ptr)>>0)];
      case 'i8': return HEAP8[((ptr)>>0)];
      case 'i16': return HEAP16[((ptr)>>1)];
      case 'i32': return HEAP32[((ptr)>>2)];
      case 'i64': return HEAP32[((ptr)>>2)];
      case 'float': return HEAPF32[((ptr)>>2)];
      case 'double': return HEAPF64[((ptr)>>3)];
      default: abort('invalid type for getValue: ' + type);
    }
  return null;
}




// Wasm globals

var wasmMemory;

// Potentially used for direct table calls.
var wasmTable;


//========================================
// Runtime essentials
//========================================

// whether we are quitting the application. no code should run after this.
// set in exit() and abort()
var ABORT = false;

// set by exit() and abort().  Passed to 'onExit' handler.
// NOTE: This is also used as the process return code code in shell environments
// but only when noExitRuntime is false.
var EXITSTATUS = 0;

/** @type {function(*, string=)} */
function assert(condition, text) {
  if (!condition) {
    abort('Assertion failed: ' + text);
  }
}

// Returns the C function with a specified identifier (for C++, you need to do manual name mangling)
function getCFunc(ident) {
  var func = Module['_' + ident]; // closure exported function
  assert(func, 'Cannot call unknown function ' + ident + ', make sure it is exported');
  return func;
}

// C calling interface.
function ccall(ident, returnType, argTypes, args, opts) {
  // For fast lookup of conversion functions
  var toC = {
    'string': function(str) {
      var ret = 0;
      if (str !== null && str !== undefined && str !== 0) { // null string
        // at most 4 bytes per UTF-8 code point, +1 for the trailing '\0'
        var len = (str.length << 2) + 1;
        ret = stackAlloc(len);
        stringToUTF8(str, ret, len);
      }
      return ret;
    },
    'array': function(arr) {
      var ret = stackAlloc(arr.length);
      writeArrayToMemory(arr, ret);
      return ret;
    }
  };

  function convertReturnValue(ret) {
    if (returnType === 'string') return UTF8ToString(ret);
    if (returnType === 'boolean') return Boolean(ret);
    return ret;
  }

  var func = getCFunc(ident);
  var cArgs = [];
  var stack = 0;
  assert(returnType !== 'array', 'Return type should not be "array".');
  if (args) {
    for (var i = 0; i < args.length; i++) {
      var converter = toC[argTypes[i]];
      if (converter) {
        if (stack === 0) stack = stackSave();
        cArgs[i] = converter(args[i]);
      } else {
        cArgs[i] = args[i];
      }
    }
  }
  var ret = func.apply(null, cArgs);
  ret = convertReturnValue(ret);
  if (stack !== 0) stackRestore(stack);
  return ret;
}

function cwrap(ident, returnType, argTypes, opts) {
  return function() {
    return ccall(ident, returnType, argTypes, arguments, opts);
  }
}

/** @type {function(number, number, string, boolean=)} */
function setValue(ptr, value, type, noSafe) {
  type = type || 'i8';
  if (type.charAt(type.length-1) === '*') type = 'i32'; // pointers are 32-bit
    switch(type) {
      case 'i1': HEAP8[((ptr)>>0)]=value; break;
      case 'i8': HEAP8[((ptr)>>0)]=value; break;
      case 'i16': HEAP16[((ptr)>>1)]=value; break;
      case 'i32': HEAP32[((ptr)>>2)]=value; break;
      case 'i64': (tempI64 = [value>>>0,(tempDouble=value,(+(Math_abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math_min((+(Math_floor((tempDouble)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math_ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)],HEAP32[((ptr)>>2)]=tempI64[0],HEAP32[(((ptr)+(4))>>2)]=tempI64[1]); break;
      case 'float': HEAPF32[((ptr)>>2)]=value; break;
      case 'double': HEAPF64[((ptr)>>3)]=value; break;
      default: abort('invalid type for setValue: ' + type);
    }
}

var ALLOC_NORMAL = 0; // Tries to use _malloc()
var ALLOC_STACK = 1; // Lives for the duration of the current function call
var ALLOC_DYNAMIC = 2; // Cannot be freed except through sbrk
var ALLOC_NONE = 3; // Do not allocate

// allocate(): This is for internal use. You can use it yourself as well, but the interface
//             is a little tricky (see docs right below). The reason is that it is optimized
//             for multiple syntaxes to save space in generated code. So you should
//             normally not use allocate(), and instead allocate memory using _malloc(),
//             initialize it with setValue(), and so forth.
// @slab: An array of data, or a number. If a number, then the size of the block to allocate,
//        in *bytes* (note that this is sometimes confusing: the next parameter does not
//        affect this!)
// @types: Either an array of types, one for each byte (or 0 if no type at that position),
//         or a single type which is used for the entire block. This only matters if there
//         is initial data - if @slab is a number, then this does not matter at all and is
//         ignored.
// @allocator: How to allocate memory, see ALLOC_*
/** @type {function((TypedArray|Array<number>|number), string, number, number=)} */
function allocate(slab, types, allocator, ptr) {
  var zeroinit, size;
  if (typeof slab === 'number') {
    zeroinit = true;
    size = slab;
  } else {
    zeroinit = false;
    size = slab.length;
  }

  var singleType = typeof types === 'string' ? types : null;

  var ret;
  if (allocator == ALLOC_NONE) {
    ret = ptr;
  } else {
    ret = [_malloc,
    stackAlloc,
    dynamicAlloc][allocator](Math.max(size, singleType ? 1 : types.length));
  }

  if (zeroinit) {
    var stop;
    ptr = ret;
    assert((ret & 3) == 0);
    stop = ret + (size & ~3);
    for (; ptr < stop; ptr += 4) {
      HEAP32[((ptr)>>2)]=0;
    }
    stop = ret + size;
    while (ptr < stop) {
      HEAP8[((ptr++)>>0)]=0;
    }
    return ret;
  }

  if (singleType === 'i8') {
    if (slab.subarray || slab.slice) {
      HEAPU8.set(/** @type {!Uint8Array} */ (slab), ret);
    } else {
      HEAPU8.set(new Uint8Array(slab), ret);
    }
    return ret;
  }

  var i = 0, type, typeSize, previousType;
  while (i < size) {
    var curr = slab[i];

    type = singleType || types[i];
    if (type === 0) {
      i++;
      continue;
    }
    assert(type, 'Must know what type to store in allocate!');

    if (type == 'i64') type = 'i32'; // special case: we have one i32 here, and one i32 later

    setValue(ret+i, curr, type);

    // no need to look up size unless type changes, so cache it
    if (previousType !== type) {
      typeSize = getNativeTypeSize(type);
      previousType = type;
    }
    i += typeSize;
  }

  return ret;
}

// Allocate memory during any stage of startup - static memory early on, dynamic memory later, malloc when ready
function getMemory(size) {
  if (!runtimeInitialized) return dynamicAlloc(size);
  return _malloc(size);
}




/** @type {function(number, number=)} */
function Pointer_stringify(ptr, length) {
  abort("this function has been removed - you should use UTF8ToString(ptr, maxBytesToRead) instead!");
}

// Given a pointer 'ptr' to a null-terminated ASCII-encoded string in the emscripten HEAP, returns
// a copy of that string as a Javascript String object.

function AsciiToString(ptr) {
  var str = '';
  while (1) {
    var ch = HEAPU8[((ptr++)>>0)];
    if (!ch) return str;
    str += String.fromCharCode(ch);
  }
}

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in ASCII form. The copy will require at most str.length+1 bytes of space in the HEAP.

function stringToAscii(str, outPtr) {
  return writeAsciiToMemory(str, outPtr, false);
}


// Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the given array that contains uint8 values, returns
// a copy of that string as a Javascript String object.

var UTF8Decoder = typeof TextDecoder !== 'undefined' ? new TextDecoder('utf8') : undefined;

/**
 * @param {number} idx
 * @param {number=} maxBytesToRead
 * @return {string}
 */
function UTF8ArrayToString(u8Array, idx, maxBytesToRead) {
  var endIdx = idx + maxBytesToRead;
  var endPtr = idx;
  // TextDecoder needs to know the byte length in advance, it doesn't stop on null terminator by itself.
  // Also, use the length info to avoid running tiny strings through TextDecoder, since .subarray() allocates garbage.
  // (As a tiny code save trick, compare endPtr against endIdx using a negation, so that undefined means Infinity)
  while (u8Array[endPtr] && !(endPtr >= endIdx)) ++endPtr;

  if (endPtr - idx > 16 && u8Array.subarray && UTF8Decoder) {
    return UTF8Decoder.decode(u8Array.subarray(idx, endPtr));
  } else {
    var str = '';
    // If building with TextDecoder, we have already computed the string length above, so test loop end condition against that
    while (idx < endPtr) {
      // For UTF8 byte structure, see:
      // http://en.wikipedia.org/wiki/UTF-8#Description
      // https://www.ietf.org/rfc/rfc2279.txt
      // https://tools.ietf.org/html/rfc3629
      var u0 = u8Array[idx++];
      if (!(u0 & 0x80)) { str += String.fromCharCode(u0); continue; }
      var u1 = u8Array[idx++] & 63;
      if ((u0 & 0xE0) == 0xC0) { str += String.fromCharCode(((u0 & 31) << 6) | u1); continue; }
      var u2 = u8Array[idx++] & 63;
      if ((u0 & 0xF0) == 0xE0) {
        u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
      } else {
        if ((u0 & 0xF8) != 0xF0) warnOnce('Invalid UTF-8 leading byte 0x' + u0.toString(16) + ' encountered when deserializing a UTF-8 string on the asm.js/wasm heap to a JS string!');
        u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | (u8Array[idx++] & 63);
      }

      if (u0 < 0x10000) {
        str += String.fromCharCode(u0);
      } else {
        var ch = u0 - 0x10000;
        str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
      }
    }
  }
  return str;
}

// Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the emscripten HEAP, returns a
// copy of that string as a Javascript String object.
// maxBytesToRead: an optional length that specifies the maximum number of bytes to read. You can omit
//                 this parameter to scan the string until the first \0 byte. If maxBytesToRead is
//                 passed, and the string at [ptr, ptr+maxBytesToReadr[ contains a null byte in the
//                 middle, then the string will cut short at that byte index (i.e. maxBytesToRead will
//                 not produce a string of exact length [ptr, ptr+maxBytesToRead[)
//                 N.B. mixing frequent uses of UTF8ToString() with and without maxBytesToRead may
//                 throw JS JIT optimizations off, so it is worth to consider consistently using one
//                 style or the other.
/**
 * @param {number} ptr
 * @param {number=} maxBytesToRead
 * @return {string}
 */
function UTF8ToString(ptr, maxBytesToRead) {
  return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : '';
}

// Copies the given Javascript String object 'str' to the given byte array at address 'outIdx',
// encoded in UTF8 form and null-terminated. The copy will require at most str.length*4+1 bytes of space in the HEAP.
// Use the function lengthBytesUTF8 to compute the exact number of bytes (excluding null terminator) that this function will write.
// Parameters:
//   str: the Javascript string to copy.
//   outU8Array: the array to copy to. Each index in this array is assumed to be one 8-byte element.
//   outIdx: The starting offset in the array to begin the copying.
//   maxBytesToWrite: The maximum number of bytes this function can write to the array.
//                    This count should include the null terminator,
//                    i.e. if maxBytesToWrite=1, only the null terminator will be written and nothing else.
//                    maxBytesToWrite=0 does not write any bytes to the output, not even the null terminator.
// Returns the number of bytes written, EXCLUDING the null terminator.

function stringToUTF8Array(str, outU8Array, outIdx, maxBytesToWrite) {
  if (!(maxBytesToWrite > 0)) // Parameter maxBytesToWrite is not optional. Negative values, 0, null, undefined and false each don't write out any bytes.
    return 0;

  var startIdx = outIdx;
  var endIdx = outIdx + maxBytesToWrite - 1; // -1 for string null terminator.
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! So decode UTF16->UTF32->UTF8.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    // For UTF8 byte structure, see http://en.wikipedia.org/wiki/UTF-8#Description and https://www.ietf.org/rfc/rfc2279.txt and https://tools.ietf.org/html/rfc3629
    var u = str.charCodeAt(i); // possibly a lead surrogate
    if (u >= 0xD800 && u <= 0xDFFF) {
      var u1 = str.charCodeAt(++i);
      u = 0x10000 + ((u & 0x3FF) << 10) | (u1 & 0x3FF);
    }
    if (u <= 0x7F) {
      if (outIdx >= endIdx) break;
      outU8Array[outIdx++] = u;
    } else if (u <= 0x7FF) {
      if (outIdx + 1 >= endIdx) break;
      outU8Array[outIdx++] = 0xC0 | (u >> 6);
      outU8Array[outIdx++] = 0x80 | (u & 63);
    } else if (u <= 0xFFFF) {
      if (outIdx + 2 >= endIdx) break;
      outU8Array[outIdx++] = 0xE0 | (u >> 12);
      outU8Array[outIdx++] = 0x80 | ((u >> 6) & 63);
      outU8Array[outIdx++] = 0x80 | (u & 63);
    } else {
      if (outIdx + 3 >= endIdx) break;
      if (u >= 0x200000) warnOnce('Invalid Unicode code point 0x' + u.toString(16) + ' encountered when serializing a JS string to an UTF-8 string on the asm.js/wasm heap! (Valid unicode code points should be in range 0-0x1FFFFF).');
      outU8Array[outIdx++] = 0xF0 | (u >> 18);
      outU8Array[outIdx++] = 0x80 | ((u >> 12) & 63);
      outU8Array[outIdx++] = 0x80 | ((u >> 6) & 63);
      outU8Array[outIdx++] = 0x80 | (u & 63);
    }
  }
  // Null-terminate the pointer to the buffer.
  outU8Array[outIdx] = 0;
  return outIdx - startIdx;
}

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in UTF8 form. The copy will require at most str.length*4+1 bytes of space in the HEAP.
// Use the function lengthBytesUTF8 to compute the exact number of bytes (excluding null terminator) that this function will write.
// Returns the number of bytes written, EXCLUDING the null terminator.

function stringToUTF8(str, outPtr, maxBytesToWrite) {
  assert(typeof maxBytesToWrite == 'number', 'stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
  return stringToUTF8Array(str, HEAPU8,outPtr, maxBytesToWrite);
}

// Returns the number of bytes the given Javascript string takes if encoded as a UTF8 byte array, EXCLUDING the null terminator byte.
function lengthBytesUTF8(str) {
  var len = 0;
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! So decode UTF16->UTF32->UTF8.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    var u = str.charCodeAt(i); // possibly a lead surrogate
    if (u >= 0xD800 && u <= 0xDFFF) u = 0x10000 + ((u & 0x3FF) << 10) | (str.charCodeAt(++i) & 0x3FF);
    if (u <= 0x7F) ++len;
    else if (u <= 0x7FF) len += 2;
    else if (u <= 0xFFFF) len += 3;
    else len += 4;
  }
  return len;
}


// Given a pointer 'ptr' to a null-terminated UTF16LE-encoded string in the emscripten HEAP, returns
// a copy of that string as a Javascript String object.

var UTF16Decoder = typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-16le') : undefined;
function UTF16ToString(ptr) {
  assert(ptr % 2 == 0, 'Pointer passed to UTF16ToString must be aligned to two bytes!');
  var endPtr = ptr;
  // TextDecoder needs to know the byte length in advance, it doesn't stop on null terminator by itself.
  // Also, use the length info to avoid running tiny strings through TextDecoder, since .subarray() allocates garbage.
  var idx = endPtr >> 1;
  while (HEAP16[idx]) ++idx;
  endPtr = idx << 1;

  if (endPtr - ptr > 32 && UTF16Decoder) {
    return UTF16Decoder.decode(HEAPU8.subarray(ptr, endPtr));
  } else {
    var i = 0;

    var str = '';
    while (1) {
      var codeUnit = HEAP16[(((ptr)+(i*2))>>1)];
      if (codeUnit == 0) return str;
      ++i;
      // fromCharCode constructs a character from a UTF-16 code unit, so we can pass the UTF16 string right through.
      str += String.fromCharCode(codeUnit);
    }
  }
}

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in UTF16 form. The copy will require at most str.length*4+2 bytes of space in the HEAP.
// Use the function lengthBytesUTF16() to compute the exact number of bytes (excluding null terminator) that this function will write.
// Parameters:
//   str: the Javascript string to copy.
//   outPtr: Byte address in Emscripten HEAP where to write the string to.
//   maxBytesToWrite: The maximum number of bytes this function can write to the array. This count should include the null
//                    terminator, i.e. if maxBytesToWrite=2, only the null terminator will be written and nothing else.
//                    maxBytesToWrite<2 does not write any bytes to the output, not even the null terminator.
// Returns the number of bytes written, EXCLUDING the null terminator.

function stringToUTF16(str, outPtr, maxBytesToWrite) {
  assert(outPtr % 2 == 0, 'Pointer passed to stringToUTF16 must be aligned to two bytes!');
  assert(typeof maxBytesToWrite == 'number', 'stringToUTF16(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
  // Backwards compatibility: if max bytes is not specified, assume unsafe unbounded write is allowed.
  if (maxBytesToWrite === undefined) {
    maxBytesToWrite = 0x7FFFFFFF;
  }
  if (maxBytesToWrite < 2) return 0;
  maxBytesToWrite -= 2; // Null terminator.
  var startPtr = outPtr;
  var numCharsToWrite = (maxBytesToWrite < str.length*2) ? (maxBytesToWrite / 2) : str.length;
  for (var i = 0; i < numCharsToWrite; ++i) {
    // charCodeAt returns a UTF-16 encoded code unit, so it can be directly written to the HEAP.
    var codeUnit = str.charCodeAt(i); // possibly a lead surrogate
    HEAP16[((outPtr)>>1)]=codeUnit;
    outPtr += 2;
  }
  // Null-terminate the pointer to the HEAP.
  HEAP16[((outPtr)>>1)]=0;
  return outPtr - startPtr;
}

// Returns the number of bytes the given Javascript string takes if encoded as a UTF16 byte array, EXCLUDING the null terminator byte.

function lengthBytesUTF16(str) {
  return str.length*2;
}

function UTF32ToString(ptr) {
  assert(ptr % 4 == 0, 'Pointer passed to UTF32ToString must be aligned to four bytes!');
  var i = 0;

  var str = '';
  while (1) {
    var utf32 = HEAP32[(((ptr)+(i*4))>>2)];
    if (utf32 == 0)
      return str;
    ++i;
    // Gotcha: fromCharCode constructs a character from a UTF-16 encoded code (pair), not from a Unicode code point! So encode the code point to UTF-16 for constructing.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    if (utf32 >= 0x10000) {
      var ch = utf32 - 0x10000;
      str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
    } else {
      str += String.fromCharCode(utf32);
    }
  }
}

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in UTF32 form. The copy will require at most str.length*4+4 bytes of space in the HEAP.
// Use the function lengthBytesUTF32() to compute the exact number of bytes (excluding null terminator) that this function will write.
// Parameters:
//   str: the Javascript string to copy.
//   outPtr: Byte address in Emscripten HEAP where to write the string to.
//   maxBytesToWrite: The maximum number of bytes this function can write to the array. This count should include the null
//                    terminator, i.e. if maxBytesToWrite=4, only the null terminator will be written and nothing else.
//                    maxBytesToWrite<4 does not write any bytes to the output, not even the null terminator.
// Returns the number of bytes written, EXCLUDING the null terminator.

function stringToUTF32(str, outPtr, maxBytesToWrite) {
  assert(outPtr % 4 == 0, 'Pointer passed to stringToUTF32 must be aligned to four bytes!');
  assert(typeof maxBytesToWrite == 'number', 'stringToUTF32(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
  // Backwards compatibility: if max bytes is not specified, assume unsafe unbounded write is allowed.
  if (maxBytesToWrite === undefined) {
    maxBytesToWrite = 0x7FFFFFFF;
  }
  if (maxBytesToWrite < 4) return 0;
  var startPtr = outPtr;
  var endPtr = startPtr + maxBytesToWrite - 4;
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! We must decode the string to UTF-32 to the heap.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    var codeUnit = str.charCodeAt(i); // possibly a lead surrogate
    if (codeUnit >= 0xD800 && codeUnit <= 0xDFFF) {
      var trailSurrogate = str.charCodeAt(++i);
      codeUnit = 0x10000 + ((codeUnit & 0x3FF) << 10) | (trailSurrogate & 0x3FF);
    }
    HEAP32[((outPtr)>>2)]=codeUnit;
    outPtr += 4;
    if (outPtr + 4 > endPtr) break;
  }
  // Null-terminate the pointer to the HEAP.
  HEAP32[((outPtr)>>2)]=0;
  return outPtr - startPtr;
}

// Returns the number of bytes the given Javascript string takes if encoded as a UTF16 byte array, EXCLUDING the null terminator byte.

function lengthBytesUTF32(str) {
  var len = 0;
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! We must decode the string to UTF-32 to the heap.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    var codeUnit = str.charCodeAt(i);
    if (codeUnit >= 0xD800 && codeUnit <= 0xDFFF) ++i; // possibly a lead surrogate, so skip over the tail surrogate.
    len += 4;
  }

  return len;
}

// Allocate heap space for a JS string, and write it there.
// It is the responsibility of the caller to free() that memory.
function allocateUTF8(str) {
  var size = lengthBytesUTF8(str) + 1;
  var ret = _malloc(size);
  if (ret) stringToUTF8Array(str, HEAP8, ret, size);
  return ret;
}

// Allocate stack space for a JS string, and write it there.
function allocateUTF8OnStack(str) {
  var size = lengthBytesUTF8(str) + 1;
  var ret = stackAlloc(size);
  stringToUTF8Array(str, HEAP8, ret, size);
  return ret;
}

// Deprecated: This function should not be called because it is unsafe and does not provide
// a maximum length limit of how many bytes it is allowed to write. Prefer calling the
// function stringToUTF8Array() instead, which takes in a maximum length that can be used
// to be secure from out of bounds writes.
/** @deprecated */
function writeStringToMemory(string, buffer, dontAddNull) {
  warnOnce('writeStringToMemory is deprecated and should not be called! Use stringToUTF8() instead!');

  var /** @type {number} */ lastChar, /** @type {number} */ end;
  if (dontAddNull) {
    // stringToUTF8Array always appends null. If we don't want to do that, remember the
    // character that existed at the location where the null will be placed, and restore
    // that after the write (below).
    end = buffer + lengthBytesUTF8(string);
    lastChar = HEAP8[end];
  }
  stringToUTF8(string, buffer, Infinity);
  if (dontAddNull) HEAP8[end] = lastChar; // Restore the value under the null character.
}

function writeArrayToMemory(array, buffer) {
  assert(array.length >= 0, 'writeArrayToMemory array must have a length (should be an array or typed array)')
  HEAP8.set(array, buffer);
}

function writeAsciiToMemory(str, buffer, dontAddNull) {
  for (var i = 0; i < str.length; ++i) {
    assert(str.charCodeAt(i) === str.charCodeAt(i)&0xff);
    HEAP8[((buffer++)>>0)]=str.charCodeAt(i);
  }
  // Null-terminate the pointer to the HEAP.
  if (!dontAddNull) HEAP8[((buffer)>>0)]=0;
}





function demangle(func) {
  warnOnce('warning: build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling');
  return func;
}

function demangleAll(text) {
  var regex =
    /__Z[\w\d_]+/g;
  return text.replace(regex,
    function(x) {
      var y = demangle(x);
      return x === y ? x : (y + ' [' + x + ']');
    });
}

function jsStackTrace() {
  var err = new Error();
  if (!err.stack) {
    // IE10+ special cases: It does have callstack info, but it is only populated if an Error object is thrown,
    // so try that as a special-case.
    try {
      throw new Error(0);
    } catch(e) {
      err = e;
    }
    if (!err.stack) {
      return '(no stack trace available)';
    }
  }
  return err.stack.toString();
}

function stackTrace() {
  var js = jsStackTrace();
  if (Module['extraStackTrace']) js += '\n' + Module['extraStackTrace']();
  return demangleAll(js);
}



// Memory management

var PAGE_SIZE = 16384;
var WASM_PAGE_SIZE = 65536;
var ASMJS_PAGE_SIZE = 16777216;

function alignUp(x, multiple) {
  if (x % multiple > 0) {
    x += multiple - (x % multiple);
  }
  return x;
}

var HEAP,
/** @type {ArrayBuffer} */
  buffer,
/** @type {Int8Array} */
  HEAP8,
/** @type {Uint8Array} */
  HEAPU8,
/** @type {Int16Array} */
  HEAP16,
/** @type {Uint16Array} */
  HEAPU16,
/** @type {Int32Array} */
  HEAP32,
/** @type {Uint32Array} */
  HEAPU32,
/** @type {Float32Array} */
  HEAPF32,
/** @type {Float64Array} */
  HEAPF64;

function updateGlobalBufferViews() {
  Module['HEAP8'] = HEAP8 = new Int8Array(buffer);
  Module['HEAP16'] = HEAP16 = new Int16Array(buffer);
  Module['HEAP32'] = HEAP32 = new Int32Array(buffer);
  Module['HEAPU8'] = HEAPU8 = new Uint8Array(buffer);
  Module['HEAPU16'] = HEAPU16 = new Uint16Array(buffer);
  Module['HEAPU32'] = HEAPU32 = new Uint32Array(buffer);
  Module['HEAPF32'] = HEAPF32 = new Float32Array(buffer);
  Module['HEAPF64'] = HEAPF64 = new Float64Array(buffer);
}


var STATIC_BASE = 1024,
    STACK_BASE = 4306640,
    STACKTOP = STACK_BASE,
    STACK_MAX = 9549520,
    DYNAMIC_BASE = 9549520,
    DYNAMICTOP_PTR = 4306384;

assert(STACK_BASE % 16 === 0, 'stack must start aligned');
assert(DYNAMIC_BASE % 16 === 0, 'heap must start aligned');



var TOTAL_STACK = 5242880;
if (Module['TOTAL_STACK']) assert(TOTAL_STACK === Module['TOTAL_STACK'], 'the stack size can no longer be determined at runtime')

var INITIAL_TOTAL_MEMORY = Module['TOTAL_MEMORY'] || 134217728;
if (INITIAL_TOTAL_MEMORY < TOTAL_STACK) err('TOTAL_MEMORY should be larger than TOTAL_STACK, was ' + INITIAL_TOTAL_MEMORY + '! (TOTAL_STACK=' + TOTAL_STACK + ')');

// Initialize the runtime's memory
// check for full engine support (use string 'subarray' to avoid closure compiler confusion)
assert(typeof Int32Array !== 'undefined' && typeof Float64Array !== 'undefined' && Int32Array.prototype.subarray !== undefined && Int32Array.prototype.set !== undefined,
       'JS engine does not provide full typed array support');







// Use a provided buffer, if there is one, or else allocate a new one
if (Module['buffer']) {
  buffer = Module['buffer'];
  assert(buffer.byteLength === INITIAL_TOTAL_MEMORY, 'provided buffer should be ' + INITIAL_TOTAL_MEMORY + ' bytes, but it is ' + buffer.byteLength);
} else {
  // Use a WebAssembly memory where available
  if (typeof WebAssembly === 'object' && typeof WebAssembly.Memory === 'function') {
    assert(INITIAL_TOTAL_MEMORY % WASM_PAGE_SIZE === 0);
    wasmMemory = new WebAssembly.Memory({ 'initial': INITIAL_TOTAL_MEMORY / WASM_PAGE_SIZE, 'maximum': INITIAL_TOTAL_MEMORY / WASM_PAGE_SIZE });
    buffer = wasmMemory.buffer;
  } else
  {
    buffer = new ArrayBuffer(INITIAL_TOTAL_MEMORY);
  }
  assert(buffer.byteLength === INITIAL_TOTAL_MEMORY);
}
updateGlobalBufferViews();


HEAP32[DYNAMICTOP_PTR>>2] = DYNAMIC_BASE;


// Initializes the stack cookie. Called at the startup of main and at the startup of each thread in pthreads mode.
function writeStackCookie() {
  assert((STACK_MAX & 3) == 0);
  HEAPU32[(STACK_MAX >> 2)-1] = 0x02135467;
  HEAPU32[(STACK_MAX >> 2)-2] = 0x89BACDFE;
}

function checkStackCookie() {
  if (HEAPU32[(STACK_MAX >> 2)-1] != 0x02135467 || HEAPU32[(STACK_MAX >> 2)-2] != 0x89BACDFE) {
    abort('Stack overflow! Stack cookie has been overwritten, expected hex dwords 0x89BACDFE and 0x02135467, but received 0x' + HEAPU32[(STACK_MAX >> 2)-2].toString(16) + ' ' + HEAPU32[(STACK_MAX >> 2)-1].toString(16));
  }
  // Also test the global address 0 for integrity.
  if (HEAP32[0] !== 0x63736d65 /* 'emsc' */) throw 'Runtime error: The application has corrupted its heap memory area (address zero)!';
}

function abortStackOverflow(allocSize) {
  abort('Stack overflow! Attempted to allocate ' + allocSize + ' bytes on the stack, but stack has only ' + (STACK_MAX - stackSave() + allocSize) + ' bytes available!');
}


  HEAP32[0] = 0x63736d65; /* 'emsc' */



// Endianness check (note: assumes compiler arch was little-endian)
HEAP16[1] = 0x6373;
if (HEAPU8[2] !== 0x73 || HEAPU8[3] !== 0x63) throw 'Runtime error: expected the system to be little-endian!';

function callRuntimeCallbacks(callbacks) {
  while(callbacks.length > 0) {
    var callback = callbacks.shift();
    if (typeof callback == 'function') {
      callback();
      continue;
    }
    var func = callback.func;
    if (typeof func === 'number') {
      if (callback.arg === undefined) {
        Module['dynCall_v'](func);
      } else {
        Module['dynCall_vi'](func, callback.arg);
      }
    } else {
      func(callback.arg === undefined ? null : callback.arg);
    }
  }
}

var __ATPRERUN__  = []; // functions called before the runtime is initialized
var __ATINIT__    = []; // functions called during startup
var __ATMAIN__    = []; // functions called when main() is to be run
var __ATEXIT__    = []; // functions called during shutdown
var __ATPOSTRUN__ = []; // functions called after the main() is called

var runtimeInitialized = false;
var runtimeExited = false;


function preRun() {
  // compatibility - merge in anything from Module['preRun'] at this time
  if (Module['preRun']) {
    if (typeof Module['preRun'] == 'function') Module['preRun'] = [Module['preRun']];
    while (Module['preRun'].length) {
      addOnPreRun(Module['preRun'].shift());
    }
  }
  callRuntimeCallbacks(__ATPRERUN__);
}

function ensureInitRuntime() {
  checkStackCookie();
  if (runtimeInitialized) return;
  runtimeInitialized = true;
  if (!Module["noFSInit"] && !FS.init.initialized) FS.init();
TTY.init();
SOCKFS.root = FS.mount(SOCKFS, {}, null);
  callRuntimeCallbacks(__ATINIT__);
}

function preMain() {
  checkStackCookie();
  FS.ignorePermissions = false;
  callRuntimeCallbacks(__ATMAIN__);
}

function exitRuntime() {
  checkStackCookie();
  runtimeExited = true;
}

function postRun() {
  checkStackCookie();
  // compatibility - merge in anything from Module['postRun'] at this time
  if (Module['postRun']) {
    if (typeof Module['postRun'] == 'function') Module['postRun'] = [Module['postRun']];
    while (Module['postRun'].length) {
      addOnPostRun(Module['postRun'].shift());
    }
  }
  callRuntimeCallbacks(__ATPOSTRUN__);
}

function addOnPreRun(cb) {
  __ATPRERUN__.unshift(cb);
}

function addOnInit(cb) {
  __ATINIT__.unshift(cb);
}

function addOnPreMain(cb) {
  __ATMAIN__.unshift(cb);
}

function addOnExit(cb) {
}

function addOnPostRun(cb) {
  __ATPOSTRUN__.unshift(cb);
}

function unSign(value, bits, ignore) {
  if (value >= 0) {
    return value;
  }
  return bits <= 32 ? 2*Math.abs(1 << (bits-1)) + value // Need some trickery, since if bits == 32, we are right at the limit of the bits JS uses in bitshifts
                    : Math.pow(2, bits)         + value;
}
function reSign(value, bits, ignore) {
  if (value <= 0) {
    return value;
  }
  var half = bits <= 32 ? Math.abs(1 << (bits-1)) // abs is needed if bits == 32
                        : Math.pow(2, bits-1);
  if (value >= half && (bits <= 32 || value > half)) { // for huge values, we can hit the precision limit and always get true here. so don't do that
                                                       // but, in general there is no perfect solution here. With 64-bit ints, we get rounding and errors
                                                       // TODO: In i64 mode 1, resign the two parts separately and safely
    value = -2*half + value; // Cannot bitshift half, as it may be at the limit of the bits JS uses in bitshifts
  }
  return value;
}


assert(Math.imul, 'This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
assert(Math.fround, 'This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
assert(Math.clz32, 'This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
assert(Math.trunc, 'This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');

var Math_abs = Math.abs;
var Math_cos = Math.cos;
var Math_sin = Math.sin;
var Math_tan = Math.tan;
var Math_acos = Math.acos;
var Math_asin = Math.asin;
var Math_atan = Math.atan;
var Math_atan2 = Math.atan2;
var Math_exp = Math.exp;
var Math_log = Math.log;
var Math_sqrt = Math.sqrt;
var Math_ceil = Math.ceil;
var Math_floor = Math.floor;
var Math_pow = Math.pow;
var Math_imul = Math.imul;
var Math_fround = Math.fround;
var Math_round = Math.round;
var Math_min = Math.min;
var Math_max = Math.max;
var Math_clz32 = Math.clz32;
var Math_trunc = Math.trunc;



// A counter of dependencies for calling run(). If we need to
// do asynchronous work before running, increment this and
// decrement it. Incrementing must happen in a place like
// Module.preRun (used by emcc to add file preloading).
// Note that you can add dependencies in preRun, even though
// it happens right before run - run will be postponed until
// the dependencies are met.
var runDependencies = 0;
var runDependencyWatcher = null;
var dependenciesFulfilled = null; // overridden to take different actions when all run dependencies are fulfilled
var runDependencyTracking = {};

function getUniqueRunDependency(id) {
  var orig = id;
  while (1) {
    if (!runDependencyTracking[id]) return id;
    id = orig + Math.random();
  }
  return id;
}

function addRunDependency(id) {
  runDependencies++;
  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }
  if (id) {
    assert(!runDependencyTracking[id]);
    runDependencyTracking[id] = 1;
    if (runDependencyWatcher === null && typeof setInterval !== 'undefined') {
      // Check for missing dependencies every few seconds
      runDependencyWatcher = setInterval(function() {
        if (ABORT) {
          clearInterval(runDependencyWatcher);
          runDependencyWatcher = null;
          return;
        }
        var shown = false;
        for (var dep in runDependencyTracking) {
          if (!shown) {
            shown = true;
            err('still waiting on run dependencies:');
          }
          err('dependency: ' + dep);
        }
        if (shown) {
          err('(end of list)');
        }
      }, 10000);
    }
  } else {
    err('warning: run dependency added without ID');
  }
}

function removeRunDependency(id) {
  runDependencies--;
  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }
  if (id) {
    assert(runDependencyTracking[id]);
    delete runDependencyTracking[id];
  } else {
    err('warning: run dependency removed without ID');
  }
  if (runDependencies == 0) {
    if (runDependencyWatcher !== null) {
      clearInterval(runDependencyWatcher);
      runDependencyWatcher = null;
    }
    if (dependenciesFulfilled) {
      var callback = dependenciesFulfilled;
      dependenciesFulfilled = null;
      callback(); // can add another dependenciesFulfilled
    }
  }
}

Module["preloadedImages"] = {}; // maps url to image data
Module["preloadedAudios"] = {}; // maps url to audio data


var memoryInitializer = null;






// Copyright 2017 The Emscripten Authors.  All rights reserved.
// Emscripten is available under two separate licenses, the MIT license and the
// University of Illinois/NCSA Open Source License.  Both these licenses can be
// found in the LICENSE file.

// Prefix of data URIs emitted by SINGLE_FILE and related options.
var dataURIPrefix = 'data:application/octet-stream;base64,';

// Indicates whether filename is a base64 data URI.
function isDataURI(filename) {
  return String.prototype.startsWith ?
      filename.startsWith(dataURIPrefix) :
      filename.indexOf(dataURIPrefix) === 0;
}




var wasmBinaryFile = 'out.wasm';
if (!isDataURI(wasmBinaryFile)) {
  wasmBinaryFile = locateFile(wasmBinaryFile);
}

function getBinary() {
  try {
    if (Module['wasmBinary']) {
      return new Uint8Array(Module['wasmBinary']);
    }
    if (Module['readBinary']) {
      return Module['readBinary'](wasmBinaryFile);
    } else {
      throw "both async and sync fetching of the wasm failed";
    }
  }
  catch (err) {
    abort(err);
  }
}

function getBinaryPromise() {
  // if we don't have the binary yet, and have the Fetch api, use that
  // in some environments, like Electron's render process, Fetch api may be present, but have a different context than expected, let's only use it on the Web
  if (!Module['wasmBinary'] && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) && typeof fetch === 'function') {
    return fetch(wasmBinaryFile, { credentials: 'same-origin' }).then(function(response) {
      if (!response['ok']) {
        throw "failed to load wasm binary file at '" + wasmBinaryFile + "'";
      }
      return response['arrayBuffer']();
    }).catch(function () {
      return getBinary();
    });
  }
  // Otherwise, getBinary should be able to get it synchronously
  return new Promise(function(resolve, reject) {
    resolve(getBinary());
  });
}

// Create the wasm instance.
// Receives the wasm imports, returns the exports.
function createWasm(env) {
  // prepare imports
  var info = {
    'env': env
    ,
    'global': {
      'NaN': NaN,
      'Infinity': Infinity
    },
    'global.Math': Math,
    'asm2wasm': asm2wasmImports
  };
  // Load the wasm module and create an instance of using native support in the JS engine.
  // handle a generated wasm instance, receiving its exports and
  // performing other necessary setup
  function receiveInstance(instance, module) {
    var exports = instance.exports;
    Module['asm'] = exports;
    removeRunDependency('wasm-instantiate');
  }
  addRunDependency('wasm-instantiate');

  // User shell pages can write their own Module.instantiateWasm = function(imports, successCallback) callback
  // to manually instantiate the Wasm module themselves. This allows pages to run the instantiation parallel
  // to any other async startup actions they are performing.
  if (Module['instantiateWasm']) {
    try {
      return Module['instantiateWasm'](info, receiveInstance);
    } catch(e) {
      err('Module.instantiateWasm callback failed with error: ' + e);
      return false;
    }
  }

  // Async compilation can be confusing when an error on the page overwrites Module
  // (for example, if the order of elements is wrong, and the one defining Module is
  // later), so we save Module and check it later.
  var trueModule = Module;
  function receiveInstantiatedSource(output) {
    // 'output' is a WebAssemblyInstantiatedSource object which has both the module and instance.
    // receiveInstance() will swap in the exports (to Module.asm) so they can be called
    assert(Module === trueModule, 'the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?');
    trueModule = null;
      // TODO: Due to Closure regression https://github.com/google/closure-compiler/issues/3193, the above line no longer optimizes out down to the following line.
      // When the regression is fixed, can restore the above USE_PTHREADS-enabled path.
    receiveInstance(output['instance']);
  }
  function instantiateArrayBuffer(receiver) {
    getBinaryPromise().then(function(binary) {
      return WebAssembly.instantiate(binary, info);
    }).then(receiver, function(reason) {
      err('failed to asynchronously prepare wasm: ' + reason);
      abort(reason);
    });
  }
  // Prefer streaming instantiation if available.
  if (!Module['wasmBinary'] &&
      typeof WebAssembly.instantiateStreaming === 'function' &&
      !isDataURI(wasmBinaryFile) &&
      typeof fetch === 'function') {
    WebAssembly.instantiateStreaming(fetch(wasmBinaryFile, { credentials: 'same-origin' }), info)
      .then(receiveInstantiatedSource, function(reason) {
        // We expect the most common failure cause to be a bad MIME type for the binary,
        // in which case falling back to ArrayBuffer instantiation should work.
        err('wasm streaming compile failed: ' + reason);
        err('falling back to ArrayBuffer instantiation');
        instantiateArrayBuffer(receiveInstantiatedSource);
      });
  } else {
    instantiateArrayBuffer(receiveInstantiatedSource);
  }
  return {}; // no exports yet; we'll fill them in later
}

// Provide an "asm.js function" for the application, called to "link" the asm.js module. We instantiate
// the wasm module at that time, and it receives imports and provides exports and so forth, the app
// doesn't need to care that it is wasm or asm.js.

Module['asm'] = function(global, env, providedBuffer) {
  // memory was already allocated (so js could use the buffer)
  env['memory'] = wasmMemory
  ;
  // import table
  env['table'] = wasmTable = new WebAssembly.Table({
    'initial': 4096,
    'maximum': 4096,
    'element': 'anyfunc'
  });
  env['__memory_base'] = 1024; // tell the memory segments where to place themselves
  env['__table_base'] = 0; // table starts at 0 by default (even in dynamic linking, for the main module)

  var exports = createWasm(env);
  assert(exports, 'binaryen setup failed (no wasm support?)');
  return exports;
};

// === Body ===

var ASM_CONSTS = [function() { FS.syncfs(false,function (err) {}) },
 function() { return Module['ingameWidth']() },
 function() { return Module['ingameHeight']() },
 function($0) { return network.available($0); },
 function() { return network.isready(); },
 function($0, $1) { network.registerServer($1 > 0 ? Module.HEAPU8.slice($0, $0 + $1) : null); },
 function($0) { network.bind($0); },
 function($0, $1, $2, $3, $4) { const [ remote, port, data ] = network.recvfrom($4); if (remote === null) return -1; const length = Math.min(data.length, $1); Module.HEAPU8.set(new Uint8Array(data, 0, length), $0); if ($2) { Module.HEAPU32[$2 >> 2] = remote; } if ($3) { Module.HEAPU8[$3] = port >> 8; Module.HEAPU8[$3 + 1] = port >> 0; } return length; },
 function($0, $1) { network.isready() && network.listServers($0, $1) },
 function($0, $1, $2, $3, $4) { network.sendto($3, $2, $4, Module.HEAPU8.slice($0, $0 + $1)); return $1; },
 function() { return Module['shouldRotate']() },
 function() { if (canvas.width != canvas.clientWidth * devicePixelRatio || canvas.height != canvas.clientHeight * devicePixelRatio) { canvas.width = canvas.clientWidth * devicePixelRatio; canvas.height = canvas.clientHeight * devicePixelRatio; } },
 function() { return canvas.width },
 function() { return canvas.height },
 function($0) { var raw = Array.from(UTF8ToString($0)); return Hangul.isCho(raw[0]) || Hangul.isJong(raw[0]) || Hangul.isVowel(raw[0]); },
 function($0, $1, $2) { var raw = Array.from(UTF8ToString($0)); var assembled = Hangul.assemble(raw); if (assembled.length > 1) { stringToUTF8(assembled.slice(0, 1), $1, 512); raw = Hangul.disassemble(assembled.slice(1)); stringToUTF8(raw.join(), $0, 512); assembled = Hangul.assemble(raw); } stringToUTF8(assembled, $2, 512); },
 function() { var params = (new URL(document.location)).searchParams; var lang = params.get('lang') || 'en'; if (lang != 'en' && lang != 'ko') { window.alert('Unknown language: ' + lang); return; } try { FS.unlink('/assets/default.fnt'); } catch (err) { } try { FS.unlink('/assets/nox.csf'); } catch (err) { } FS.symlink('/assets/' + lang + '/default.fnt', '/assets/default.fnt'); FS.symlink('/assets/' + lang + '/nox.csf', '/assets/nox.csf'); },
 function() { FS.syncfs(false, function (err) {}); },
 function() { return isMobile() },
 function() { return screen.width; },
 function() { return screen.height; },
 function($0) { if (typeof Module['setWindowTitle'] !== 'undefined') { Module['setWindowTitle'](UTF8ToString($0)); } return 0; },
 function($0, $1, $2) { var w = $0; var h = $1; var pixels = $2; if (!Module['SDL2']) Module['SDL2'] = {}; var SDL2 = Module['SDL2']; if (SDL2.ctxCanvas !== Module['canvas']) { SDL2.ctx = Module['createContext'](Module['canvas'], false, true); SDL2.ctxCanvas = Module['canvas']; } if (SDL2.w !== w || SDL2.h !== h || SDL2.imageCtx !== SDL2.ctx) { SDL2.image = SDL2.ctx.createImageData(w, h); SDL2.w = w; SDL2.h = h; SDL2.imageCtx = SDL2.ctx; } var data = SDL2.image.data; var src = pixels >> 2; var dst = 0; var num; if (typeof CanvasPixelArray !== 'undefined' && data instanceof CanvasPixelArray) { num = data.length; while (dst < num) { var val = HEAP32[src]; data[dst ] = val & 0xff; data[dst+1] = (val >> 8) & 0xff; data[dst+2] = (val >> 16) & 0xff; data[dst+3] = 0xff; src++; dst += 4; } } else { if (SDL2.data32Data !== data) { SDL2.data32 = new Int32Array(data.buffer); SDL2.data8 = new Uint8Array(data.buffer); } var data32 = SDL2.data32; num = data32.length; data32.set(HEAP32.subarray(src, src + num)); var data8 = SDL2.data8; var i = 3; var j = i + 4*num; if (num % 8 == 0) { while (i < j) { data8[i] = 0xff; i = i + 4 | 0; data8[i] = 0xff; i = i + 4 | 0; data8[i] = 0xff; i = i + 4 | 0; data8[i] = 0xff; i = i + 4 | 0; data8[i] = 0xff; i = i + 4 | 0; data8[i] = 0xff; i = i + 4 | 0; data8[i] = 0xff; i = i + 4 | 0; data8[i] = 0xff; i = i + 4 | 0; } } else { while (i < j) { data8[i] = 0xff; i = i + 4 | 0; } } } SDL2.ctx.putImageData(SDL2.image, 0, 0); return 0; },
 function($0, $1, $2, $3, $4) { var w = $0; var h = $1; var hot_x = $2; var hot_y = $3; var pixels = $4; var canvas = document.createElement("canvas"); canvas.width = w; canvas.height = h; var ctx = canvas.getContext("2d"); var image = ctx.createImageData(w, h); var data = image.data; var src = pixels >> 2; var dst = 0; var num; if (typeof CanvasPixelArray !== 'undefined' && data instanceof CanvasPixelArray) { num = data.length; while (dst < num) { var val = HEAP32[src]; data[dst ] = val & 0xff; data[dst+1] = (val >> 8) & 0xff; data[dst+2] = (val >> 16) & 0xff; data[dst+3] = (val >> 24) & 0xff; src++; dst += 4; } } else { var data32 = new Int32Array(data.buffer); num = data32.length; data32.set(HEAP32.subarray(src, src + num)); } ctx.putImageData(image, 0, 0); var url = hot_x === 0 && hot_y === 0 ? "url(" + canvas.toDataURL() + "), auto" : "url(" + canvas.toDataURL() + ") " + hot_x + " " + hot_y + ", auto"; var urlBuf = _malloc(url.length + 1); stringToUTF8(url, urlBuf, url.length + 1); return urlBuf; },
 function($0) { if (Module['canvas']) { Module['canvas'].style['cursor'] = UTF8ToString($0); } return 0; },
 function() { if (Module['canvas']) { Module['canvas'].style['cursor'] = 'none'; } },
 function() { if (typeof(AudioContext) !== 'undefined') { return 1; } else if (typeof(webkitAudioContext) !== 'undefined') { return 1; } return 0; },
 function() { if ((typeof(navigator.mediaDevices) !== 'undefined') && (typeof(navigator.mediaDevices.getUserMedia) !== 'undefined')) { return 1; } else if (typeof(navigator.webkitGetUserMedia) !== 'undefined') { return 1; } return 0; },
 function($0) { if(typeof(Module['SDL2']) === 'undefined') { Module['SDL2'] = {}; } var SDL2 = Module['SDL2']; if (!$0) { SDL2.audio = {}; } else { SDL2.capture = {}; } if (!SDL2.audioContext) { if (typeof(AudioContext) !== 'undefined') { SDL2.audioContext = new AudioContext(); } else if (typeof(webkitAudioContext) !== 'undefined') { SDL2.audioContext = new webkitAudioContext(); } } return SDL2.audioContext === undefined ? -1 : 0; },
 function() { var SDL2 = Module['SDL2']; return SDL2.audioContext.sampleRate; },
 function($0, $1, $2, $3) { var SDL2 = Module['SDL2']; var have_microphone = function(stream) { if (SDL2.capture.silenceTimer !== undefined) { clearTimeout(SDL2.capture.silenceTimer); SDL2.capture.silenceTimer = undefined; } SDL2.capture.mediaStreamNode = SDL2.audioContext.createMediaStreamSource(stream); SDL2.capture.scriptProcessorNode = SDL2.audioContext.createScriptProcessor($1, $0, 1); SDL2.capture.scriptProcessorNode.onaudioprocess = function(audioProcessingEvent) { if ((SDL2 === undefined) || (SDL2.capture === undefined)) { return; } audioProcessingEvent.outputBuffer.getChannelData(0).fill(0.0); SDL2.capture.currentCaptureBuffer = audioProcessingEvent.inputBuffer; dynCall('vi', $2, [$3]); }; SDL2.capture.mediaStreamNode.connect(SDL2.capture.scriptProcessorNode); SDL2.capture.scriptProcessorNode.connect(SDL2.audioContext.destination); SDL2.capture.stream = stream; }; var no_microphone = function(error) { }; SDL2.capture.silenceBuffer = SDL2.audioContext.createBuffer($0, $1, SDL2.audioContext.sampleRate); SDL2.capture.silenceBuffer.getChannelData(0).fill(0.0); var silence_callback = function() { SDL2.capture.currentCaptureBuffer = SDL2.capture.silenceBuffer; dynCall('vi', $2, [$3]); }; SDL2.capture.silenceTimer = setTimeout(silence_callback, ($1 / SDL2.audioContext.sampleRate) * 1000); if ((navigator.mediaDevices !== undefined) && (navigator.mediaDevices.getUserMedia !== undefined)) { navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(have_microphone).catch(no_microphone); } else if (navigator.webkitGetUserMedia !== undefined) { navigator.webkitGetUserMedia({ audio: true, video: false }, have_microphone, no_microphone); } },
 function($0, $1, $2, $3) { var SDL2 = Module['SDL2']; SDL2.audio.scriptProcessorNode = SDL2.audioContext['createScriptProcessor']($1, 0, $0); SDL2.audio.scriptProcessorNode['onaudioprocess'] = function (e) { if ((SDL2 === undefined) || (SDL2.audio === undefined)) { return; } SDL2.audio.currentOutputBuffer = e['outputBuffer']; dynCall('vi', $2, [$3]); }; SDL2.audio.scriptProcessorNode['connect'](SDL2.audioContext['destination']); },
 function($0) { var SDL2 = Module['SDL2']; if ($0) { if (SDL2.capture.silenceTimer !== undefined) { clearTimeout(SDL2.capture.silenceTimer); } if (SDL2.capture.stream !== undefined) { var tracks = SDL2.capture.stream.getAudioTracks(); for (var i = 0; i < tracks.length; i++) { SDL2.capture.stream.removeTrack(tracks[i]); } SDL2.capture.stream = undefined; } if (SDL2.capture.scriptProcessorNode !== undefined) { SDL2.capture.scriptProcessorNode.onaudioprocess = function(audioProcessingEvent) {}; SDL2.capture.scriptProcessorNode.disconnect(); SDL2.capture.scriptProcessorNode = undefined; } if (SDL2.capture.mediaStreamNode !== undefined) { SDL2.capture.mediaStreamNode.disconnect(); SDL2.capture.mediaStreamNode = undefined; } if (SDL2.capture.silenceBuffer !== undefined) { SDL2.capture.silenceBuffer = undefined } SDL2.capture = undefined; } else { if (SDL2.audio.scriptProcessorNode != undefined) { SDL2.audio.scriptProcessorNode.disconnect(); SDL2.audio.scriptProcessorNode = undefined; } SDL2.audio = undefined; } if ((SDL2.audioContext !== undefined) && (SDL2.audio === undefined) && (SDL2.capture === undefined)) { SDL2.audioContext.close(); SDL2.audioContext = undefined; } },
 function($0, $1) { var SDL2 = Module['SDL2']; var numChannels = SDL2.capture.currentCaptureBuffer.numberOfChannels; for (var c = 0; c < numChannels; ++c) { var channelData = SDL2.capture.currentCaptureBuffer.getChannelData(c); if (channelData.length != $1) { throw 'Web Audio capture buffer length mismatch! Destination size: ' + channelData.length + ' samples vs expected ' + $1 + ' samples!'; } if (numChannels == 1) { for (var j = 0; j < $1; ++j) { setValue($0 + (j * 4), channelData[j], 'float'); } } else { for (var j = 0; j < $1; ++j) { setValue($0 + (((j * numChannels) + c) * 4), channelData[j], 'float'); } } } },
 function($0, $1) { var SDL2 = Module['SDL2']; var numChannels = SDL2.audio.currentOutputBuffer['numberOfChannels']; for (var c = 0; c < numChannels; ++c) { var channelData = SDL2.audio.currentOutputBuffer['getChannelData'](c); if (channelData.length != $1) { throw 'Web Audio output buffer length mismatch! Destination size: ' + channelData.length + ' samples vs expected ' + $1 + ' samples!'; } for (var j = 0; j < $1; ++j) { channelData[j] = HEAPF32[$0 + ((j*numChannels + c) << 2) >> 2]; } } },
 function($0, $1, $2, $3, $4) { return Browser.safeSetTimeout(function() { dynCall('viiii', $0, [$1, $2, $3, $4]); }, $2); }];

function _emscripten_asm_const_iiiiii(code, a0, a1, a2, a3, a4) {
  return ASM_CONSTS[code](a0, a1, a2, a3, a4);
}

function _emscripten_asm_const_i(code) {
  return ASM_CONSTS[code]();
}

function _emscripten_asm_const_ii(code, a0) {
  return ASM_CONSTS[code](a0);
}

function _emscripten_asm_const_iii(code, a0, a1) {
  return ASM_CONSTS[code](a0, a1);
}

function _emscripten_asm_const_iiiii(code, a0, a1, a2, a3) {
  return ASM_CONSTS[code](a0, a1, a2, a3);
}

function _emscripten_asm_const_iiii(code, a0, a1, a2) {
  return ASM_CONSTS[code](a0, a1, a2);
}




// STATICTOP = STATIC_BASE + 4305616;
/* global initializers */  __ATINIT__.push({ func: function() { ___emscripten_environ_constructor() } });








/* no memory initializer */
var tempDoublePtr = 4306624
assert(tempDoublePtr % 8 == 0);

function copyTempFloat(ptr) { // functions, because inlining this code increases code size too much
  HEAP8[tempDoublePtr] = HEAP8[ptr];
  HEAP8[tempDoublePtr+1] = HEAP8[ptr+1];
  HEAP8[tempDoublePtr+2] = HEAP8[ptr+2];
  HEAP8[tempDoublePtr+3] = HEAP8[ptr+3];
}

function copyTempDouble(ptr) {
  HEAP8[tempDoublePtr] = HEAP8[ptr];
  HEAP8[tempDoublePtr+1] = HEAP8[ptr+1];
  HEAP8[tempDoublePtr+2] = HEAP8[ptr+2];
  HEAP8[tempDoublePtr+3] = HEAP8[ptr+3];
  HEAP8[tempDoublePtr+4] = HEAP8[ptr+4];
  HEAP8[tempDoublePtr+5] = HEAP8[ptr+5];
  HEAP8[tempDoublePtr+6] = HEAP8[ptr+6];
  HEAP8[tempDoublePtr+7] = HEAP8[ptr+7];
}

// {{PRE_LIBRARY}}


  
  var ENV={};function ___buildEnvironment(environ) {
      // WARNING: Arbitrary limit!
      var MAX_ENV_VALUES = 64;
      var TOTAL_ENV_SIZE = 1024;
  
      // Statically allocate memory for the environment.
      var poolPtr;
      var envPtr;
      if (!___buildEnvironment.called) {
        ___buildEnvironment.called = true;
        // Set default values. Use string keys for Closure Compiler compatibility.
        ENV['USER'] = ENV['LOGNAME'] = 'web_user';
        ENV['PATH'] = '/';
        ENV['PWD'] = '/';
        ENV['HOME'] = '/home/web_user';
        ENV['LANG'] = 'C.UTF-8';
        ENV['_'] = Module['thisProgram'];
        // Allocate memory.
        poolPtr = getMemory(TOTAL_ENV_SIZE);
        envPtr = getMemory(MAX_ENV_VALUES * 4);
        HEAP32[((envPtr)>>2)]=poolPtr;
        HEAP32[((environ)>>2)]=envPtr;
      } else {
        envPtr = HEAP32[((environ)>>2)];
        poolPtr = HEAP32[((envPtr)>>2)];
      }
  
      // Collect key=value lines.
      var strings = [];
      var totalSize = 0;
      for (var key in ENV) {
        if (typeof ENV[key] === 'string') {
          var line = key + '=' + ENV[key];
          strings.push(line);
          totalSize += line.length;
        }
      }
      if (totalSize > TOTAL_ENV_SIZE) {
        throw new Error('Environment size exceeded TOTAL_ENV_SIZE!');
      }
  
      // Make new.
      var ptrSize = 4;
      for (var i = 0; i < strings.length; i++) {
        var line = strings[i];
        writeAsciiToMemory(line, poolPtr);
        HEAP32[(((envPtr)+(i * ptrSize))>>2)]=poolPtr;
        poolPtr += line.length + 1;
      }
      HEAP32[(((envPtr)+(strings.length * ptrSize))>>2)]=0;
    }

  function ___lock() {}

  
  
  
  function ___setErrNo(value) {
      if (Module['___errno_location']) HEAP32[((Module['___errno_location']())>>2)]=value;
      else err('failed to set errno from JS');
      return value;
    }
  
  var PATH={splitPath:function (filename) {
        var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
        return splitPathRe.exec(filename).slice(1);
      },normalizeArray:function (parts, allowAboveRoot) {
        // if the path tries to go above the root, `up` ends up > 0
        var up = 0;
        for (var i = parts.length - 1; i >= 0; i--) {
          var last = parts[i];
          if (last === '.') {
            parts.splice(i, 1);
          } else if (last === '..') {
            parts.splice(i, 1);
            up++;
          } else if (up) {
            parts.splice(i, 1);
            up--;
          }
        }
        // if the path is allowed to go above the root, restore leading ..s
        if (allowAboveRoot) {
          for (; up; up--) {
            parts.unshift('..');
          }
        }
        return parts;
      },normalize:function (path) {
        var isAbsolute = path.charAt(0) === '/',
            trailingSlash = path.substr(-1) === '/';
        // Normalize the path
        path = PATH.normalizeArray(path.split('/').filter(function(p) {
          return !!p;
        }), !isAbsolute).join('/');
        if (!path && !isAbsolute) {
          path = '.';
        }
        if (path && trailingSlash) {
          path += '/';
        }
        return (isAbsolute ? '/' : '') + path;
      },dirname:function (path) {
        var result = PATH.splitPath(path),
            root = result[0],
            dir = result[1];
        if (!root && !dir) {
          // No dirname whatsoever
          return '.';
        }
        if (dir) {
          // It has a dirname, strip trailing slash
          dir = dir.substr(0, dir.length - 1);
        }
        return root + dir;
      },basename:function (path) {
        // EMSCRIPTEN return '/'' for '/', not an empty string
        if (path === '/') return '/';
        var lastSlash = path.lastIndexOf('/');
        if (lastSlash === -1) return path;
        return path.substr(lastSlash+1);
      },extname:function (path) {
        return PATH.splitPath(path)[3];
      },join:function () {
        var paths = Array.prototype.slice.call(arguments, 0);
        return PATH.normalize(paths.join('/'));
      },join2:function (l, r) {
        return PATH.normalize(l + '/' + r);
      },resolve:function () {
        var resolvedPath = '',
          resolvedAbsolute = false;
        for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
          var path = (i >= 0) ? arguments[i] : FS.cwd();
          // Skip empty and invalid entries
          if (typeof path !== 'string') {
            throw new TypeError('Arguments to path.resolve must be strings');
          } else if (!path) {
            return ''; // an invalid portion invalidates the whole thing
          }
          resolvedPath = path + '/' + resolvedPath;
          resolvedAbsolute = path.charAt(0) === '/';
        }
        // At this point the path should be resolved to a full absolute path, but
        // handle relative paths to be safe (might happen when process.cwd() fails)
        resolvedPath = PATH.normalizeArray(resolvedPath.split('/').filter(function(p) {
          return !!p;
        }), !resolvedAbsolute).join('/');
        return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
      },relative:function (from, to) {
        from = PATH.resolve(from).substr(1);
        to = PATH.resolve(to).substr(1);
        function trim(arr) {
          var start = 0;
          for (; start < arr.length; start++) {
            if (arr[start] !== '') break;
          }
          var end = arr.length - 1;
          for (; end >= 0; end--) {
            if (arr[end] !== '') break;
          }
          if (start > end) return [];
          return arr.slice(start, end - start + 1);
        }
        var fromParts = trim(from.split('/'));
        var toParts = trim(to.split('/'));
        var length = Math.min(fromParts.length, toParts.length);
        var samePartsLength = length;
        for (var i = 0; i < length; i++) {
          if (fromParts[i] !== toParts[i]) {
            samePartsLength = i;
            break;
          }
        }
        var outputParts = [];
        for (var i = samePartsLength; i < fromParts.length; i++) {
          outputParts.push('..');
        }
        outputParts = outputParts.concat(toParts.slice(samePartsLength));
        return outputParts.join('/');
      }};
  
  var TTY={ttys:[],init:function () {
        // https://github.com/emscripten-core/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // currently, FS.init does not distinguish if process.stdin is a file or TTY
        //   // device, it always assumes it's a TTY device. because of this, we're forcing
        //   // process.stdin to UTF8 encoding to at least make stdin reading compatible
        //   // with text files until FS.init can be refactored.
        //   process['stdin']['setEncoding']('utf8');
        // }
      },shutdown:function () {
        // https://github.com/emscripten-core/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // inolen: any idea as to why node -e 'process.stdin.read()' wouldn't exit immediately (with process.stdin being a tty)?
        //   // isaacs: because now it's reading from the stream, you've expressed interest in it, so that read() kicks off a _read() which creates a ReadReq operation
        //   // inolen: I thought read() in that case was a synchronous operation that just grabbed some amount of buffered data if it exists?
        //   // isaacs: it is. but it also triggers a _read() call, which calls readStart() on the handle
        //   // isaacs: do process.stdin.pause() and i'd think it'd probably close the pending call
        //   process['stdin']['pause']();
        // }
      },register:function (dev, ops) {
        TTY.ttys[dev] = { input: [], output: [], ops: ops };
        FS.registerDevice(dev, TTY.stream_ops);
      },stream_ops:{open:function (stream) {
          var tty = TTY.ttys[stream.node.rdev];
          if (!tty) {
            throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
          }
          stream.tty = tty;
          stream.seekable = false;
        },close:function (stream) {
          // flush any pending line data
          stream.tty.ops.flush(stream.tty);
        },flush:function (stream) {
          stream.tty.ops.flush(stream.tty);
        },read:function (stream, buffer, offset, length, pos /* ignored */) {
          if (!stream.tty || !stream.tty.ops.get_char) {
            throw new FS.ErrnoError(ERRNO_CODES.ENXIO);
          }
          var bytesRead = 0;
          for (var i = 0; i < length; i++) {
            var result;
            try {
              result = stream.tty.ops.get_char(stream.tty);
            } catch (e) {
              throw new FS.ErrnoError(ERRNO_CODES.EIO);
            }
            if (result === undefined && bytesRead === 0) {
              throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
            }
            if (result === null || result === undefined) break;
            bytesRead++;
            buffer[offset+i] = result;
          }
          if (bytesRead) {
            stream.node.timestamp = Date.now();
          }
          return bytesRead;
        },write:function (stream, buffer, offset, length, pos) {
          if (!stream.tty || !stream.tty.ops.put_char) {
            throw new FS.ErrnoError(ERRNO_CODES.ENXIO);
          }
          try {
            for (var i = 0; i < length; i++) {
              stream.tty.ops.put_char(stream.tty, buffer[offset+i]);
            }
          } catch (e) {
            throw new FS.ErrnoError(ERRNO_CODES.EIO);
          }
          if (length) {
            stream.node.timestamp = Date.now();
          }
          return i;
        }},default_tty_ops:{get_char:function (tty) {
          if (!tty.input.length) {
            var result = null;
            if (ENVIRONMENT_IS_NODE) {
              // we will read data by chunks of BUFSIZE
              var BUFSIZE = 256;
              var buf = new Buffer(BUFSIZE);
              var bytesRead = 0;
  
              var isPosixPlatform = (process.platform != 'win32'); // Node doesn't offer a direct check, so test by exclusion
  
              var fd = process.stdin.fd;
              if (isPosixPlatform) {
                // Linux and Mac cannot use process.stdin.fd (which isn't set up as sync)
                var usingDevice = false;
                try {
                  fd = fs.openSync('/dev/stdin', 'r');
                  usingDevice = true;
                } catch (e) {}
              }
  
              try {
                bytesRead = fs.readSync(fd, buf, 0, BUFSIZE, null);
              } catch(e) {
                // Cross-platform differences: on Windows, reading EOF throws an exception, but on other OSes,
                // reading EOF returns 0. Uniformize behavior by treating the EOF exception to return 0.
                if (e.toString().indexOf('EOF') != -1) bytesRead = 0;
                else throw e;
              }
  
              if (usingDevice) { fs.closeSync(fd); }
              if (bytesRead > 0) {
                result = buf.slice(0, bytesRead).toString('utf-8');
              } else {
                result = null;
              }
            } else
            if (typeof window != 'undefined' &&
              typeof window.prompt == 'function') {
              // Browser.
              result = window.prompt('Input: ');  // returns null on cancel
              if (result !== null) {
                result += '\n';
              }
            } else if (typeof readline == 'function') {
              // Command line.
              result = readline();
              if (result !== null) {
                result += '\n';
              }
            }
            if (!result) {
              return null;
            }
            tty.input = intArrayFromString(result, true);
          }
          return tty.input.shift();
        },put_char:function (tty, val) {
          if (val === null || val === 10) {
            out(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          } else {
            if (val != 0) tty.output.push(val); // val == 0 would cut text output off in the middle.
          }
        },flush:function (tty) {
          if (tty.output && tty.output.length > 0) {
            out(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          }
        }},default_tty1_ops:{put_char:function (tty, val) {
          if (val === null || val === 10) {
            err(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          } else {
            if (val != 0) tty.output.push(val);
          }
        },flush:function (tty) {
          if (tty.output && tty.output.length > 0) {
            err(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          }
        }}};
  
  var MEMFS={ops_table:null,mount:function (mount) {
        return MEMFS.createNode(null, '/', 16384 | 511 /* 0777 */, 0);
      },createNode:function (parent, name, mode, dev) {
        if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
          // no supported
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (!MEMFS.ops_table) {
          MEMFS.ops_table = {
            dir: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                lookup: MEMFS.node_ops.lookup,
                mknod: MEMFS.node_ops.mknod,
                rename: MEMFS.node_ops.rename,
                unlink: MEMFS.node_ops.unlink,
                rmdir: MEMFS.node_ops.rmdir,
                readdir: MEMFS.node_ops.readdir,
                symlink: MEMFS.node_ops.symlink
              },
              stream: {
                llseek: MEMFS.stream_ops.llseek
              }
            },
            file: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr
              },
              stream: {
                llseek: MEMFS.stream_ops.llseek,
                read: MEMFS.stream_ops.read,
                write: MEMFS.stream_ops.write,
                allocate: MEMFS.stream_ops.allocate,
                mmap: MEMFS.stream_ops.mmap,
                msync: MEMFS.stream_ops.msync
              }
            },
            link: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                readlink: MEMFS.node_ops.readlink
              },
              stream: {}
            },
            chrdev: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr
              },
              stream: FS.chrdev_stream_ops
            }
          };
        }
        var node = FS.createNode(parent, name, mode, dev);
        if (FS.isDir(node.mode)) {
          node.node_ops = MEMFS.ops_table.dir.node;
          node.stream_ops = MEMFS.ops_table.dir.stream;
          node.contents = {};
        } else if (FS.isFile(node.mode)) {
          node.node_ops = MEMFS.ops_table.file.node;
          node.stream_ops = MEMFS.ops_table.file.stream;
          node.usedBytes = 0; // The actual number of bytes used in the typed array, as opposed to contents.length which gives the whole capacity.
          // When the byte data of the file is populated, this will point to either a typed array, or a normal JS array. Typed arrays are preferred
          // for performance, and used by default. However, typed arrays are not resizable like normal JS arrays are, so there is a small disk size
          // penalty involved for appending file writes that continuously grow a file similar to std::vector capacity vs used -scheme.
          node.contents = null; 
        } else if (FS.isLink(node.mode)) {
          node.node_ops = MEMFS.ops_table.link.node;
          node.stream_ops = MEMFS.ops_table.link.stream;
        } else if (FS.isChrdev(node.mode)) {
          node.node_ops = MEMFS.ops_table.chrdev.node;
          node.stream_ops = MEMFS.ops_table.chrdev.stream;
        }
        node.timestamp = Date.now();
        // add the new node to the parent
        if (parent) {
          parent.contents[name] = node;
        }
        return node;
      },getFileDataAsRegularArray:function (node) {
        if (node.contents && node.contents.subarray) {
          var arr = [];
          for (var i = 0; i < node.usedBytes; ++i) arr.push(node.contents[i]);
          return arr; // Returns a copy of the original data.
        }
        return node.contents; // No-op, the file contents are already in a JS array. Return as-is.
      },getFileDataAsTypedArray:function (node) {
        if (!node.contents) return new Uint8Array;
        if (node.contents.subarray) return node.contents.subarray(0, node.usedBytes); // Make sure to not return excess unused bytes.
        return new Uint8Array(node.contents);
      },expandFileStorage:function (node, newCapacity) {
        var prevCapacity = node.contents ? node.contents.length : 0;
        if (prevCapacity >= newCapacity) return; // No need to expand, the storage was already large enough.
        // Don't expand strictly to the given requested limit if it's only a very small increase, but instead geometrically grow capacity.
        // For small filesizes (<1MB), perform size*2 geometric increase, but for large sizes, do a much more conservative size*1.125 increase to
        // avoid overshooting the allocation cap by a very large margin.
        var CAPACITY_DOUBLING_MAX = 1024 * 1024;
        newCapacity = Math.max(newCapacity, (prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2.0 : 1.125)) | 0);
        if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256); // At minimum allocate 256b for each file when expanding.
        var oldContents = node.contents;
        node.contents = new Uint8Array(newCapacity); // Allocate new storage.
        if (node.usedBytes > 0) node.contents.set(oldContents.subarray(0, node.usedBytes), 0); // Copy old data over to the new storage.
        return;
      },resizeFileStorage:function (node, newSize) {
        if (node.usedBytes == newSize) return;
        if (newSize == 0) {
          node.contents = null; // Fully decommit when requesting a resize to zero.
          node.usedBytes = 0;
          return;
        }
        if (!node.contents || node.contents.subarray) { // Resize a typed array if that is being used as the backing store.
          var oldContents = node.contents;
          node.contents = new Uint8Array(new ArrayBuffer(newSize)); // Allocate new storage.
          if (oldContents) {
            node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes))); // Copy old data over to the new storage.
          }
          node.usedBytes = newSize;
          return;
        }
        // Backing with a JS array.
        if (!node.contents) node.contents = [];
        if (node.contents.length > newSize) node.contents.length = newSize;
        else while (node.contents.length < newSize) node.contents.push(0);
        node.usedBytes = newSize;
      },node_ops:{getattr:function (node) {
          var attr = {};
          // device numbers reuse inode numbers.
          attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
          attr.ino = node.id;
          attr.mode = node.mode;
          attr.nlink = 1;
          attr.uid = 0;
          attr.gid = 0;
          attr.rdev = node.rdev;
          if (FS.isDir(node.mode)) {
            attr.size = 4096;
          } else if (FS.isFile(node.mode)) {
            attr.size = node.usedBytes;
          } else if (FS.isLink(node.mode)) {
            attr.size = node.link.length;
          } else {
            attr.size = 0;
          }
          attr.atime = new Date(node.timestamp);
          attr.mtime = new Date(node.timestamp);
          attr.ctime = new Date(node.timestamp);
          // NOTE: In our implementation, st_blocks = Math.ceil(st_size/st_blksize),
          //       but this is not required by the standard.
          attr.blksize = 4096;
          attr.blocks = Math.ceil(attr.size / attr.blksize);
          return attr;
        },setattr:function (node, attr) {
          if (attr.mode !== undefined) {
            node.mode = attr.mode;
          }
          if (attr.timestamp !== undefined) {
            node.timestamp = attr.timestamp;
          }
          if (attr.size !== undefined) {
            MEMFS.resizeFileStorage(node, attr.size);
          }
        },lookup:function (parent, name) {
          throw FS.genericErrors[ERRNO_CODES.ENOENT];
        },mknod:function (parent, name, mode, dev) {
          return MEMFS.createNode(parent, name, mode, dev);
        },rename:function (old_node, new_dir, new_name) {
          // if we're overwriting a directory at new_name, make sure it's empty.
          if (FS.isDir(old_node.mode)) {
            var new_node;
            try {
              new_node = FS.lookupNode(new_dir, new_name);
            } catch (e) {
            }
            if (new_node) {
              for (var i in new_node.contents) {
                throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY);
              }
            }
          }
          // do the internal rewiring
          delete old_node.parent.contents[old_node.name];
          old_node.name = new_name;
          new_dir.contents[new_name] = old_node;
          old_node.parent = new_dir;
        },unlink:function (parent, name) {
          delete parent.contents[name];
        },rmdir:function (parent, name) {
          var node = FS.lookupNode(parent, name);
          for (var i in node.contents) {
            throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY);
          }
          delete parent.contents[name];
        },readdir:function (node) {
          var entries = ['.', '..']
          for (var key in node.contents) {
            if (!node.contents.hasOwnProperty(key)) {
              continue;
            }
            entries.push(key);
          }
          return entries;
        },symlink:function (parent, newname, oldpath) {
          var node = MEMFS.createNode(parent, newname, 511 /* 0777 */ | 40960, 0);
          node.link = oldpath;
          return node;
        },readlink:function (node) {
          if (!FS.isLink(node.mode)) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
          return node.link;
        }},stream_ops:{read:function (stream, buffer, offset, length, position) {
          var contents = stream.node.contents;
          if (position >= stream.node.usedBytes) return 0;
          var size = Math.min(stream.node.usedBytes - position, length);
          assert(size >= 0);
          if (size > 8 && contents.subarray) { // non-trivial, and typed array
            buffer.set(contents.subarray(position, position + size), offset);
          } else {
            for (var i = 0; i < size; i++) buffer[offset + i] = contents[position + i];
          }
          return size;
        },write:function (stream, buffer, offset, length, position, canOwn) {
  
          if (!length) return 0;
          var node = stream.node;
          node.timestamp = Date.now();
  
          if (buffer.subarray && (!node.contents || node.contents.subarray)) { // This write is from a typed array to a typed array?
            if (canOwn) {
              assert(position === 0, 'canOwn must imply no weird position inside the file');
              node.contents = buffer.subarray(offset, offset + length);
              node.usedBytes = length;
              return length;
            } else if (node.usedBytes === 0 && position === 0) { // If this is a simple first write to an empty file, do a fast set since we don't need to care about old data.
              node.contents = new Uint8Array(buffer.subarray(offset, offset + length));
              node.usedBytes = length;
              return length;
            } else if (position + length <= node.usedBytes) { // Writing to an already allocated and used subrange of the file?
              node.contents.set(buffer.subarray(offset, offset + length), position);
              return length;
            }
          }
  
          // Appending to an existing file and we need to reallocate, or source data did not come as a typed array.
          MEMFS.expandFileStorage(node, position+length);
          if (node.contents.subarray && buffer.subarray) node.contents.set(buffer.subarray(offset, offset + length), position); // Use typed array write if available.
          else {
            for (var i = 0; i < length; i++) {
             node.contents[position + i] = buffer[offset + i]; // Or fall back to manual write if not.
            }
          }
          node.usedBytes = Math.max(node.usedBytes, position+length);
          return length;
        },llseek:function (stream, offset, whence) {
          var position = offset;
          if (whence === 1) {  // SEEK_CUR.
            position += stream.position;
          } else if (whence === 2) {  // SEEK_END.
            if (FS.isFile(stream.node.mode)) {
              position += stream.node.usedBytes;
            }
          }
          if (position < 0) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
          return position;
        },allocate:function (stream, offset, length) {
          MEMFS.expandFileStorage(stream.node, offset + length);
          stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length);
        },mmap:function (stream, buffer, offset, length, position, prot, flags) {
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
          }
          var ptr;
          var allocated;
          var contents = stream.node.contents;
          // Only make a new copy when MAP_PRIVATE is specified.
          if ( !(flags & 2) &&
                (contents.buffer === buffer || contents.buffer === buffer.buffer) ) {
            // We can't emulate MAP_SHARED when the file is not backed by the buffer
            // we're mapping to (e.g. the HEAP buffer).
            allocated = false;
            ptr = contents.byteOffset;
          } else {
            // Try to avoid unnecessary slices.
            if (position > 0 || position + length < stream.node.usedBytes) {
              if (contents.subarray) {
                contents = contents.subarray(position, position + length);
              } else {
                contents = Array.prototype.slice.call(contents, position, position + length);
              }
            }
            allocated = true;
            ptr = _malloc(length);
            if (!ptr) {
              throw new FS.ErrnoError(ERRNO_CODES.ENOMEM);
            }
            buffer.set(contents, ptr);
          }
          return { ptr: ptr, allocated: allocated };
        },msync:function (stream, buffer, offset, length, mmapFlags) {
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
          }
          if (mmapFlags & 2) {
            // MAP_PRIVATE calls need not to be synced back to underlying fs
            return 0;
          }
  
          var bytesWritten = MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
          // should we check if bytesWritten and length are the same?
          return 0;
        }}};
  
  var IDBFS={dbs:{},indexedDB:function () {
        if (typeof indexedDB !== 'undefined') return indexedDB;
        var ret = null;
        if (typeof window === 'object') ret = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        assert(ret, 'IDBFS used, but indexedDB not supported');
        return ret;
      },DB_VERSION:21,DB_STORE_NAME:"FILE_DATA",mount:function (mount) {
        // reuse all of the core MEMFS functionality
        return MEMFS.mount.apply(null, arguments);
      },syncfs:function (mount, populate, callback) {
        IDBFS.getLocalSet(mount, function(err, local) {
          if (err) return callback(err);
  
          IDBFS.getRemoteSet(mount, function(err, remote) {
            if (err) return callback(err);
  
            var src = populate ? remote : local;
            var dst = populate ? local : remote;
  
            IDBFS.reconcile(src, dst, callback);
          });
        });
      },getDB:function (name, callback) {
        // check the cache first
        var db = IDBFS.dbs[name];
        if (db) {
          return callback(null, db);
        }
  
        var req;
        try {
          req = IDBFS.indexedDB().open(name, IDBFS.DB_VERSION);
        } catch (e) {
          return callback(e);
        }
        if (!req) {
          return callback("Unable to connect to IndexedDB");
        }
        req.onupgradeneeded = function(e) {
          var db = e.target.result;
          var transaction = e.target.transaction;
  
          var fileStore;
  
          if (db.objectStoreNames.contains(IDBFS.DB_STORE_NAME)) {
            fileStore = transaction.objectStore(IDBFS.DB_STORE_NAME);
          } else {
            fileStore = db.createObjectStore(IDBFS.DB_STORE_NAME);
          }
  
          if (!fileStore.indexNames.contains('timestamp')) {
            fileStore.createIndex('timestamp', 'timestamp', { unique: false });
          }
        };
        req.onsuccess = function() {
          db = req.result;
  
          // add to the cache
          IDBFS.dbs[name] = db;
          callback(null, db);
        };
        req.onerror = function(e) {
          callback(this.error);
          e.preventDefault();
        };
      },getLocalSet:function (mount, callback) {
        var entries = {};
  
        function isRealDir(p) {
          return p !== '.' && p !== '..';
        };
        function toAbsolute(root) {
          return function(p) {
            return PATH.join2(root, p);
          }
        };
  
        var check = FS.readdir(mount.mountpoint).filter(isRealDir).map(toAbsolute(mount.mountpoint));
  
        while (check.length) {
          var path = check.pop();
          var stat;
  
          try {
            stat = FS.stat(path);
          } catch (e) {
            return callback(e);
          }
  
          if (FS.isDir(stat.mode)) {
            check.push.apply(check, FS.readdir(path).filter(isRealDir).map(toAbsolute(path)));
          }
  
          entries[path] = { timestamp: stat.mtime };
        }
  
        return callback(null, { type: 'local', entries: entries });
      },getRemoteSet:function (mount, callback) {
        var entries = {};
  
        IDBFS.getDB(mount.mountpoint, function(err, db) {
          if (err) return callback(err);
  
          try {
            var transaction = db.transaction([IDBFS.DB_STORE_NAME], 'readonly');
            transaction.onerror = function(e) {
              callback(this.error);
              e.preventDefault();
            };
  
            var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
            var index = store.index('timestamp');
  
            index.openKeyCursor().onsuccess = function(event) {
              var cursor = event.target.result;
  
              if (!cursor) {
                return callback(null, { type: 'remote', db: db, entries: entries });
              }
  
              entries[cursor.primaryKey] = { timestamp: cursor.key };
  
              cursor.continue();
            };
          } catch (e) {
            return callback(e);
          }
        });
      },loadLocalEntry:function (path, callback) {
        var stat, node;
  
        try {
          var lookup = FS.lookupPath(path);
          node = lookup.node;
          stat = FS.stat(path);
        } catch (e) {
          return callback(e);
        }
  
        if (FS.isDir(stat.mode)) {
          return callback(null, { timestamp: stat.mtime, mode: stat.mode });
        } else if (FS.isFile(stat.mode)) {
          // Performance consideration: storing a normal JavaScript array to a IndexedDB is much slower than storing a typed array.
          // Therefore always convert the file contents to a typed array first before writing the data to IndexedDB.
          node.contents = MEMFS.getFileDataAsTypedArray(node);
          return callback(null, { timestamp: stat.mtime, mode: stat.mode, contents: node.contents });
        } else {
          return callback(new Error('node type not supported'));
        }
      },storeLocalEntry:function (path, entry, callback) {
        try {
          if (FS.isDir(entry.mode)) {
            FS.mkdir(path, entry.mode);
          } else if (FS.isFile(entry.mode)) {
            FS.writeFile(path, entry.contents, { canOwn: true });
          } else {
            return callback(new Error('node type not supported'));
          }
  
          FS.chmod(path, entry.mode);
          FS.utime(path, entry.timestamp, entry.timestamp);
        } catch (e) {
          return callback(e);
        }
  
        callback(null);
      },removeLocalEntry:function (path, callback) {
        try {
          var lookup = FS.lookupPath(path);
          var stat = FS.stat(path);
  
          if (FS.isDir(stat.mode)) {
            FS.rmdir(path);
          } else if (FS.isFile(stat.mode)) {
            FS.unlink(path);
          }
        } catch (e) {
          return callback(e);
        }
  
        callback(null);
      },loadRemoteEntry:function (store, path, callback) {
        var req = store.get(path);
        req.onsuccess = function(event) { callback(null, event.target.result); };
        req.onerror = function(e) {
          callback(this.error);
          e.preventDefault();
        };
      },storeRemoteEntry:function (store, path, entry, callback) {
        var req = store.put(entry, path);
        req.onsuccess = function() { callback(null); };
        req.onerror = function(e) {
          callback(this.error);
          e.preventDefault();
        };
      },removeRemoteEntry:function (store, path, callback) {
        var req = store.delete(path);
        req.onsuccess = function() { callback(null); };
        req.onerror = function(e) {
          callback(this.error);
          e.preventDefault();
        };
      },reconcile:function (src, dst, callback) {
        var total = 0;
  
        var create = [];
        Object.keys(src.entries).forEach(function (key) {
          var e = src.entries[key];
          var e2 = dst.entries[key];
          if (!e2 || e.timestamp > e2.timestamp) {
            create.push(key);
            total++;
          }
        });
  
        var remove = [];
        Object.keys(dst.entries).forEach(function (key) {
          var e = dst.entries[key];
          var e2 = src.entries[key];
          if (!e2) {
            remove.push(key);
            total++;
          }
        });
  
        if (!total) {
          return callback(null);
        }
  
        var errored = false;
        var completed = 0;
        var db = src.type === 'remote' ? src.db : dst.db;
        var transaction = db.transaction([IDBFS.DB_STORE_NAME], 'readwrite');
        var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
  
        function done(err) {
          if (err) {
            if (!done.errored) {
              done.errored = true;
              return callback(err);
            }
            return;
          }
          if (++completed >= total) {
            return callback(null);
          }
        };
  
        transaction.onerror = function(e) {
          done(this.error);
          e.preventDefault();
        };
  
        // sort paths in ascending order so directory entries are created
        // before the files inside them
        create.sort().forEach(function (path) {
          if (dst.type === 'local') {
            IDBFS.loadRemoteEntry(store, path, function (err, entry) {
              if (err) return done(err);
              IDBFS.storeLocalEntry(path, entry, done);
            });
          } else {
            IDBFS.loadLocalEntry(path, function (err, entry) {
              if (err) return done(err);
              IDBFS.storeRemoteEntry(store, path, entry, done);
            });
          }
        });
  
        // sort paths in descending order so files are deleted before their
        // parent directories
        remove.sort().reverse().forEach(function(path) {
          if (dst.type === 'local') {
            IDBFS.removeLocalEntry(path, done);
          } else {
            IDBFS.removeRemoteEntry(store, path, done);
          }
        });
      }};
  
  var NODEFS={isWindows:false,staticInit:function () {
        NODEFS.isWindows = !!process.platform.match(/^win/);
        var flags = process["binding"]("constants");
        // Node.js 4 compatibility: it has no namespaces for constants
        if (flags["fs"]) {
          flags = flags["fs"];
        }
        NODEFS.flagsForNodeMap = {
          "1024": flags["O_APPEND"],
          "64": flags["O_CREAT"],
          "128": flags["O_EXCL"],
          "0": flags["O_RDONLY"],
          "2": flags["O_RDWR"],
          "4096": flags["O_SYNC"],
          "512": flags["O_TRUNC"],
          "1": flags["O_WRONLY"]
        };
      },bufferFrom:function (arrayBuffer) {
        // Node.js < 4.5 compatibility: Buffer.from does not support ArrayBuffer
        // Buffer.from before 4.5 was just a method inherited from Uint8Array
        // Buffer.alloc has been added with Buffer.from together, so check it instead
        return Buffer.alloc ? Buffer.from(arrayBuffer) : new Buffer(arrayBuffer);
      },mount:function (mount) {
        assert(ENVIRONMENT_IS_NODE);
        return NODEFS.createNode(null, '/', NODEFS.getMode(mount.opts.root), 0);
      },createNode:function (parent, name, mode, dev) {
        if (!FS.isDir(mode) && !FS.isFile(mode) && !FS.isLink(mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var node = FS.createNode(parent, name, mode);
        node.node_ops = NODEFS.node_ops;
        node.stream_ops = NODEFS.stream_ops;
        return node;
      },getMode:function (path) {
        var stat;
        try {
          stat = fs.lstatSync(path);
          if (NODEFS.isWindows) {
            // Node.js on Windows never represents permission bit 'x', so
            // propagate read bits to execute bits
            stat.mode = stat.mode | ((stat.mode & 292) >> 2);
          }
        } catch (e) {
          if (!e.code) throw e;
          throw new FS.ErrnoError(ERRNO_CODES[e.code]);
        }
        return stat.mode;
      },realPath:function (node) {
        var parts = [];
        while (node.parent !== node) {
          parts.push(node.name);
          node = node.parent;
        }
        parts.push(node.mount.opts.root);
        parts.reverse();
        return PATH.join.apply(null, parts);
      },flagsForNode:function (flags) {
        flags &= ~0x200000 /*O_PATH*/; // Ignore this flag from musl, otherwise node.js fails to open the file.
        flags &= ~0x800 /*O_NONBLOCK*/; // Ignore this flag from musl, otherwise node.js fails to open the file.
        flags &= ~0x8000 /*O_LARGEFILE*/; // Ignore this flag from musl, otherwise node.js fails to open the file.
        flags &= ~0x80000 /*O_CLOEXEC*/; // Some applications may pass it; it makes no sense for a single process.
        var newFlags = 0;
        for (var k in NODEFS.flagsForNodeMap) {
          if (flags & k) {
            newFlags |= NODEFS.flagsForNodeMap[k];
            flags ^= k;
          }
        }
  
        if (!flags) {
          return newFlags;
        } else {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
      },node_ops:{getattr:function (node) {
          var path = NODEFS.realPath(node);
          var stat;
          try {
            stat = fs.lstatSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
          // node.js v0.10.20 doesn't report blksize and blocks on Windows. Fake them with default blksize of 4096.
          // See http://support.microsoft.com/kb/140365
          if (NODEFS.isWindows && !stat.blksize) {
            stat.blksize = 4096;
          }
          if (NODEFS.isWindows && !stat.blocks) {
            stat.blocks = (stat.size+stat.blksize-1)/stat.blksize|0;
          }
          return {
            dev: stat.dev,
            ino: stat.ino,
            mode: stat.mode,
            nlink: stat.nlink,
            uid: stat.uid,
            gid: stat.gid,
            rdev: stat.rdev,
            size: stat.size,
            atime: stat.atime,
            mtime: stat.mtime,
            ctime: stat.ctime,
            blksize: stat.blksize,
            blocks: stat.blocks
          };
        },setattr:function (node, attr) {
          var path = NODEFS.realPath(node);
          try {
            if (attr.mode !== undefined) {
              fs.chmodSync(path, attr.mode);
              // update the common node structure mode as well
              node.mode = attr.mode;
            }
            if (attr.timestamp !== undefined) {
              var date = new Date(attr.timestamp);
              fs.utimesSync(path, date, date);
            }
            if (attr.size !== undefined) {
              fs.truncateSync(path, attr.size);
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },lookup:function (parent, name) {
          var path = PATH.join2(NODEFS.realPath(parent), name);
          var mode = NODEFS.getMode(path);
          return NODEFS.createNode(parent, name, mode);
        },mknod:function (parent, name, mode, dev) {
          var node = NODEFS.createNode(parent, name, mode, dev);
          // create the backing node for this in the fs root as well
          var path = NODEFS.realPath(node);
          try {
            if (FS.isDir(node.mode)) {
              fs.mkdirSync(path, node.mode);
            } else {
              fs.writeFileSync(path, '', { mode: node.mode });
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
          return node;
        },rename:function (oldNode, newDir, newName) {
          var oldPath = NODEFS.realPath(oldNode);
          var newPath = PATH.join2(NODEFS.realPath(newDir), newName);
          try {
            fs.renameSync(oldPath, newPath);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },unlink:function (parent, name) {
          var path = PATH.join2(NODEFS.realPath(parent), name);
          try {
            fs.unlinkSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },rmdir:function (parent, name) {
          var path = PATH.join2(NODEFS.realPath(parent), name);
          try {
            fs.rmdirSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },readdir:function (node) {
          var path = NODEFS.realPath(node);
          try {
            return fs.readdirSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },symlink:function (parent, newName, oldPath) {
          var newPath = PATH.join2(NODEFS.realPath(parent), newName);
          try {
            fs.symlinkSync(oldPath, newPath);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },readlink:function (node) {
          var path = NODEFS.realPath(node);
          try {
            path = fs.readlinkSync(path);
            path = NODEJS_PATH.relative(NODEJS_PATH.resolve(node.mount.opts.root), path);
            return path;
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        }},stream_ops:{open:function (stream) {
          var path = NODEFS.realPath(stream.node);
          try {
            if (FS.isFile(stream.node.mode)) {
              stream.nfd = fs.openSync(path, NODEFS.flagsForNode(stream.flags));
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },close:function (stream) {
          try {
            if (FS.isFile(stream.node.mode) && stream.nfd) {
              fs.closeSync(stream.nfd);
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },read:function (stream, buffer, offset, length, position) {
          // Node.js < 6 compatibility: node errors on 0 length reads
          if (length === 0) return 0;
          try {
            return fs.readSync(stream.nfd, NODEFS.bufferFrom(buffer.buffer), offset, length, position);
          } catch (e) {
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },write:function (stream, buffer, offset, length, position) {
          try {
            return fs.writeSync(stream.nfd, NODEFS.bufferFrom(buffer.buffer), offset, length, position);
          } catch (e) {
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },llseek:function (stream, offset, whence) {
          var position = offset;
          if (whence === 1) {  // SEEK_CUR.
            position += stream.position;
          } else if (whence === 2) {  // SEEK_END.
            if (FS.isFile(stream.node.mode)) {
              try {
                var stat = fs.fstatSync(stream.nfd);
                position += stat.size;
              } catch (e) {
                throw new FS.ErrnoError(ERRNO_CODES[e.code]);
              }
            }
          }
  
          if (position < 0) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
  
          return position;
        }}};
  
  var WORKERFS={DIR_MODE:16895,FILE_MODE:33279,reader:null,mount:function (mount) {
        assert(ENVIRONMENT_IS_WORKER);
        if (!WORKERFS.reader) WORKERFS.reader = new FileReaderSync();
        var root = WORKERFS.createNode(null, '/', WORKERFS.DIR_MODE, 0);
        var createdParents = {};
        function ensureParent(path) {
          // return the parent node, creating subdirs as necessary
          var parts = path.split('/');
          var parent = root;
          for (var i = 0; i < parts.length-1; i++) {
            var curr = parts.slice(0, i+1).join('/');
            // Issue 4254: Using curr as a node name will prevent the node
            // from being found in FS.nameTable when FS.open is called on
            // a path which holds a child of this node,
            // given that all FS functions assume node names
            // are just their corresponding parts within their given path,
            // rather than incremental aggregates which include their parent's
            // directories.
            if (!createdParents[curr]) {
              createdParents[curr] = WORKERFS.createNode(parent, parts[i], WORKERFS.DIR_MODE, 0);
            }
            parent = createdParents[curr];
          }
          return parent;
        }
        function base(path) {
          var parts = path.split('/');
          return parts[parts.length-1];
        }
        // We also accept FileList here, by using Array.prototype
        Array.prototype.forEach.call(mount.opts["files"] || [], function(file) {
          WORKERFS.createNode(ensureParent(file.name), base(file.name), WORKERFS.FILE_MODE, 0, file, file.lastModifiedDate);
        });
        (mount.opts["blobs"] || []).forEach(function(obj) {
          WORKERFS.createNode(ensureParent(obj["name"]), base(obj["name"]), WORKERFS.FILE_MODE, 0, obj["data"]);
        });
        (mount.opts["packages"] || []).forEach(function(pack) {
          pack['metadata'].files.forEach(function(file) {
            var name = file.filename.substr(1); // remove initial slash
            WORKERFS.createNode(ensureParent(name), base(name), WORKERFS.FILE_MODE, 0, pack['blob'].slice(file.start, file.end));
          });
        });
        return root;
      },createNode:function (parent, name, mode, dev, contents, mtime) {
        var node = FS.createNode(parent, name, mode);
        node.mode = mode;
        node.node_ops = WORKERFS.node_ops;
        node.stream_ops = WORKERFS.stream_ops;
        node.timestamp = (mtime || new Date).getTime();
        assert(WORKERFS.FILE_MODE !== WORKERFS.DIR_MODE);
        if (mode === WORKERFS.FILE_MODE) {
          node.size = contents.size;
          node.contents = contents;
        } else {
          node.size = 4096;
          node.contents = {};
        }
        if (parent) {
          parent.contents[name] = node;
        }
        return node;
      },node_ops:{getattr:function (node) {
          return {
            dev: 1,
            ino: undefined,
            mode: node.mode,
            nlink: 1,
            uid: 0,
            gid: 0,
            rdev: undefined,
            size: node.size,
            atime: new Date(node.timestamp),
            mtime: new Date(node.timestamp),
            ctime: new Date(node.timestamp),
            blksize: 4096,
            blocks: Math.ceil(node.size / 4096),
          };
        },setattr:function (node, attr) {
          if (attr.mode !== undefined) {
            node.mode = attr.mode;
          }
          if (attr.timestamp !== undefined) {
            node.timestamp = attr.timestamp;
          }
        },lookup:function (parent, name) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOENT);
        },mknod:function (parent, name, mode, dev) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        },rename:function (oldNode, newDir, newName) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        },unlink:function (parent, name) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        },rmdir:function (parent, name) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        },readdir:function (node) {
          var entries = ['.', '..'];
          for (var key in node.contents) {
            if (!node.contents.hasOwnProperty(key)) {
              continue;
            }
            entries.push(key);
          }
          return entries;
        },symlink:function (parent, newName, oldPath) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        },readlink:function (node) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }},stream_ops:{read:function (stream, buffer, offset, length, position) {
          if (position >= stream.node.size) return 0;
          var chunk = stream.node.contents.slice(position, position + length);
          var ab = WORKERFS.reader.readAsArrayBuffer(chunk);
          buffer.set(new Uint8Array(ab), offset);
          return chunk.size;
        },write:function (stream, buffer, offset, length, position) {
          throw new FS.ErrnoError(ERRNO_CODES.EIO);
        },llseek:function (stream, offset, whence) {
          var position = offset;
          if (whence === 1) {  // SEEK_CUR.
            position += stream.position;
          } else if (whence === 2) {  // SEEK_END.
            if (FS.isFile(stream.node.mode)) {
              position += stream.node.size;
            }
          }
          if (position < 0) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
          return position;
        }}};
  
  var ERRNO_MESSAGES={0:"Success",1:"Not super-user",2:"No such file or directory",3:"No such process",4:"Interrupted system call",5:"I/O error",6:"No such device or address",7:"Arg list too long",8:"Exec format error",9:"Bad file number",10:"No children",11:"No more processes",12:"Not enough core",13:"Permission denied",14:"Bad address",15:"Block device required",16:"Mount device busy",17:"File exists",18:"Cross-device link",19:"No such device",20:"Not a directory",21:"Is a directory",22:"Invalid argument",23:"Too many open files in system",24:"Too many open files",25:"Not a typewriter",26:"Text file busy",27:"File too large",28:"No space left on device",29:"Illegal seek",30:"Read only file system",31:"Too many links",32:"Broken pipe",33:"Math arg out of domain of func",34:"Math result not representable",35:"File locking deadlock error",36:"File or path name too long",37:"No record locks available",38:"Function not implemented",39:"Directory not empty",40:"Too many symbolic links",42:"No message of desired type",43:"Identifier removed",44:"Channel number out of range",45:"Level 2 not synchronized",46:"Level 3 halted",47:"Level 3 reset",48:"Link number out of range",49:"Protocol driver not attached",50:"No CSI structure available",51:"Level 2 halted",52:"Invalid exchange",53:"Invalid request descriptor",54:"Exchange full",55:"No anode",56:"Invalid request code",57:"Invalid slot",59:"Bad font file fmt",60:"Device not a stream",61:"No data (for no delay io)",62:"Timer expired",63:"Out of streams resources",64:"Machine is not on the network",65:"Package not installed",66:"The object is remote",67:"The link has been severed",68:"Advertise error",69:"Srmount error",70:"Communication error on send",71:"Protocol error",72:"Multihop attempted",73:"Cross mount point (not really error)",74:"Trying to read unreadable message",75:"Value too large for defined data type",76:"Given log. name not unique",77:"f.d. invalid for this operation",78:"Remote address changed",79:"Can   access a needed shared lib",80:"Accessing a corrupted shared lib",81:".lib section in a.out corrupted",82:"Attempting to link in too many libs",83:"Attempting to exec a shared library",84:"Illegal byte sequence",86:"Streams pipe error",87:"Too many users",88:"Socket operation on non-socket",89:"Destination address required",90:"Message too long",91:"Protocol wrong type for socket",92:"Protocol not available",93:"Unknown protocol",94:"Socket type not supported",95:"Not supported",96:"Protocol family not supported",97:"Address family not supported by protocol family",98:"Address already in use",99:"Address not available",100:"Network interface is not configured",101:"Network is unreachable",102:"Connection reset by network",103:"Connection aborted",104:"Connection reset by peer",105:"No buffer space available",106:"Socket is already connected",107:"Socket is not connected",108:"Can't send after socket shutdown",109:"Too many references",110:"Connection timed out",111:"Connection refused",112:"Host is down",113:"Host is unreachable",114:"Socket already connected",115:"Connection already in progress",116:"Stale file handle",122:"Quota exceeded",123:"No medium (in tape drive)",125:"Operation canceled",130:"Previous owner died",131:"State not recoverable"};
  
  var ERRNO_CODES={EPERM:1,ENOENT:2,ESRCH:3,EINTR:4,EIO:5,ENXIO:6,E2BIG:7,ENOEXEC:8,EBADF:9,ECHILD:10,EAGAIN:11,EWOULDBLOCK:11,ENOMEM:12,EACCES:13,EFAULT:14,ENOTBLK:15,EBUSY:16,EEXIST:17,EXDEV:18,ENODEV:19,ENOTDIR:20,EISDIR:21,EINVAL:22,ENFILE:23,EMFILE:24,ENOTTY:25,ETXTBSY:26,EFBIG:27,ENOSPC:28,ESPIPE:29,EROFS:30,EMLINK:31,EPIPE:32,EDOM:33,ERANGE:34,ENOMSG:42,EIDRM:43,ECHRNG:44,EL2NSYNC:45,EL3HLT:46,EL3RST:47,ELNRNG:48,EUNATCH:49,ENOCSI:50,EL2HLT:51,EDEADLK:35,ENOLCK:37,EBADE:52,EBADR:53,EXFULL:54,ENOANO:55,EBADRQC:56,EBADSLT:57,EDEADLOCK:35,EBFONT:59,ENOSTR:60,ENODATA:61,ETIME:62,ENOSR:63,ENONET:64,ENOPKG:65,EREMOTE:66,ENOLINK:67,EADV:68,ESRMNT:69,ECOMM:70,EPROTO:71,EMULTIHOP:72,EDOTDOT:73,EBADMSG:74,ENOTUNIQ:76,EBADFD:77,EREMCHG:78,ELIBACC:79,ELIBBAD:80,ELIBSCN:81,ELIBMAX:82,ELIBEXEC:83,ENOSYS:38,ENOTEMPTY:39,ENAMETOOLONG:36,ELOOP:40,EOPNOTSUPP:95,EPFNOSUPPORT:96,ECONNRESET:104,ENOBUFS:105,EAFNOSUPPORT:97,EPROTOTYPE:91,ENOTSOCK:88,ENOPROTOOPT:92,ESHUTDOWN:108,ECONNREFUSED:111,EADDRINUSE:98,ECONNABORTED:103,ENETUNREACH:101,ENETDOWN:100,ETIMEDOUT:110,EHOSTDOWN:112,EHOSTUNREACH:113,EINPROGRESS:115,EALREADY:114,EDESTADDRREQ:89,EMSGSIZE:90,EPROTONOSUPPORT:93,ESOCKTNOSUPPORT:94,EADDRNOTAVAIL:99,ENETRESET:102,EISCONN:106,ENOTCONN:107,ETOOMANYREFS:109,EUSERS:87,EDQUOT:122,ESTALE:116,ENOTSUP:95,ENOMEDIUM:123,EILSEQ:84,EOVERFLOW:75,ECANCELED:125,ENOTRECOVERABLE:131,EOWNERDEAD:130,ESTRPIPE:86};
  
  var _stdin=4306400;
  
  var _stdout=4306416;
  
  var _stderr=4306432;var FS={root:null,mounts:[],devices:{},streams:[],nextInode:1,nameTable:null,currentPath:"/",initialized:false,ignorePermissions:true,trackingDelegate:{},tracking:{openFlags:{READ:1,WRITE:2}},ErrnoError:null,genericErrors:{},filesystems:null,syncFSRequests:0,handleFSError:function (e) {
        if (!(e instanceof FS.ErrnoError)) throw e + ' : ' + stackTrace();
        return ___setErrNo(e.errno);
      },lookupPath:function (path, opts) {
        path = PATH.resolve(FS.cwd(), path);
        opts = opts || {};
  
        if (!path) return { path: '', node: null };
  
        var defaults = {
          follow_mount: true,
          recurse_count: 0
        };
        for (var key in defaults) {
          if (opts[key] === undefined) {
            opts[key] = defaults[key];
          }
        }
  
        if (opts.recurse_count > 8) {  // max recursive lookup of 8
          throw new FS.ErrnoError(40);
        }
  
        // split the path
        var parts = PATH.normalizeArray(path.split('/').filter(function(p) {
          return !!p;
        }), false);
  
        // start at the root
        var current = FS.root;
        var current_path = '/';
  
        for (var i = 0; i < parts.length; i++) {
          var islast = (i === parts.length-1);
          if (islast && opts.parent) {
            // stop resolving
            break;
          }
  
          current = FS.lookupNode(current, parts[i]);
          current_path = PATH.join2(current_path, parts[i]);
  
          // jump to the mount's root node if this is a mountpoint
          if (FS.isMountpoint(current)) {
            if (!islast || (islast && opts.follow_mount)) {
              current = current.mounted.root;
            }
          }
  
          // by default, lookupPath will not follow a symlink if it is the final path component.
          // setting opts.follow = true will override this behavior.
          if (!islast || opts.follow) {
            var count = 0;
            while (FS.isLink(current.mode)) {
              var link = FS.readlink(current_path);
              current_path = PATH.resolve(PATH.dirname(current_path), link);
  
              var lookup = FS.lookupPath(current_path, { recurse_count: opts.recurse_count });
              current = lookup.node;
  
              if (count++ > 40) {  // limit max consecutive symlinks to 40 (SYMLOOP_MAX).
                throw new FS.ErrnoError(40);
              }
            }
          }
        }
  
        return { path: current_path, node: current };
      },getPath:function (node) {
        var path;
        while (true) {
          if (FS.isRoot(node)) {
            var mount = node.mount.mountpoint;
            if (!path) return mount;
            return mount[mount.length-1] !== '/' ? mount + '/' + path : mount + path;
          }
          path = path ? node.name + '/' + path : node.name;
          node = node.parent;
        }
      },hashName:function (parentid, name) {
        var hash = 0;
  
        name = name.toLowerCase();
  
        for (var i = 0; i < name.length; i++) {
          hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
        }
        return ((parentid + hash) >>> 0) % FS.nameTable.length;
      },hashAddNode:function (node) {
        var hash = FS.hashName(node.parent.id, node.name);
        node.name_next = FS.nameTable[hash];
        FS.nameTable[hash] = node;
      },hashRemoveNode:function (node) {
        var hash = FS.hashName(node.parent.id, node.name);
        if (FS.nameTable[hash] === node) {
          FS.nameTable[hash] = node.name_next;
        } else {
          var current = FS.nameTable[hash];
          while (current) {
            if (current.name_next === node) {
              current.name_next = node.name_next;
              break;
            }
            current = current.name_next;
          }
        }
      },lookupNode:function (parent, name) {
        var err = FS.mayLookup(parent);
        if (err) {
          throw new FS.ErrnoError(err, parent);
        }
        var hash = FS.hashName(parent.id, name);
        name = name.toLowerCase();
        for (var node = FS.nameTable[hash]; node; node = node.name_next) {
          var nodeName = node.name;
          nodeName = nodeName.toLowerCase();
          if (node.parent.id === parent.id && nodeName === name) {
            return node;
          }
        }
        // if we failed to find it in the cache, call into the VFS
        return FS.lookup(parent, name);
      },createNode:function (parent, name, mode, rdev) {
        if (!FS.FSNode) {
          FS.FSNode = function(parent, name, mode, rdev) {
            if (!parent) {
              parent = this;  // root node sets parent to itself
            }
            this.parent = parent;
            this.mount = parent.mount;
            this.mounted = null;
            this.id = FS.nextInode++;
            this.name = name;
            this.mode = mode;
            this.node_ops = {};
            this.stream_ops = {};
            this.rdev = rdev;
          };
  
          FS.FSNode.prototype = {};
  
          // compatibility
          var readMode = 292 | 73;
          var writeMode = 146;
  
          // NOTE we must use Object.defineProperties instead of individual calls to
          // Object.defineProperty in order to make closure compiler happy
          Object.defineProperties(FS.FSNode.prototype, {
            read: {
              get: function() { return (this.mode & readMode) === readMode; },
              set: function(val) { val ? this.mode |= readMode : this.mode &= ~readMode; }
            },
            write: {
              get: function() { return (this.mode & writeMode) === writeMode; },
              set: function(val) { val ? this.mode |= writeMode : this.mode &= ~writeMode; }
            },
            isFolder: {
              get: function() { return FS.isDir(this.mode); }
            },
            isDevice: {
              get: function() { return FS.isChrdev(this.mode); }
            }
          });
        }
  
        var node = new FS.FSNode(parent, name, mode, rdev);
  
        FS.hashAddNode(node);
  
        return node;
      },destroyNode:function (node) {
        FS.hashRemoveNode(node);
      },isRoot:function (node) {
        return node === node.parent;
      },isMountpoint:function (node) {
        return !!node.mounted;
      },isFile:function (mode) {
        return (mode & 61440) === 32768;
      },isDir:function (mode) {
        return (mode & 61440) === 16384;
      },isLink:function (mode) {
        return (mode & 61440) === 40960;
      },isChrdev:function (mode) {
        return (mode & 61440) === 8192;
      },isBlkdev:function (mode) {
        return (mode & 61440) === 24576;
      },isFIFO:function (mode) {
        return (mode & 61440) === 4096;
      },isSocket:function (mode) {
        return (mode & 49152) === 49152;
      },flagModes:{"r":0,"rs":1052672,"r+":2,"w":577,"wx":705,"xw":705,"w+":578,"wx+":706,"xw+":706,"a":1089,"ax":1217,"xa":1217,"a+":1090,"ax+":1218,"xa+":1218},modeStringToFlags:function (str) {
        var flags = FS.flagModes[str];
        if (typeof flags === 'undefined') {
          throw new Error('Unknown file open mode: ' + str);
        }
        return flags;
      },flagsToPermissionString:function (flag) {
        var perms = ['r', 'w', 'rw'][flag & 3];
        if ((flag & 512)) {
          perms += 'w';
        }
        return perms;
      },nodePermissions:function (node, perms) {
        if (FS.ignorePermissions) {
          return 0;
        }
        // return 0 if any user, group or owner bits are set.
        if (perms.indexOf('r') !== -1 && !(node.mode & 292)) {
          return 13;
        } else if (perms.indexOf('w') !== -1 && !(node.mode & 146)) {
          return 13;
        } else if (perms.indexOf('x') !== -1 && !(node.mode & 73)) {
          return 13;
        }
        return 0;
      },mayLookup:function (dir) {
        var err = FS.nodePermissions(dir, 'x');
        if (err) return err;
        if (!dir.node_ops.lookup) return 13;
        return 0;
      },mayCreate:function (dir, name) {
        try {
          var node = FS.lookupNode(dir, name);
          return 17;
        } catch (e) {
        }
        return FS.nodePermissions(dir, 'wx');
      },mayDelete:function (dir, name, isdir) {
        var node;
        try {
          node = FS.lookupNode(dir, name);
        } catch (e) {
          return e.errno;
        }
        var err = FS.nodePermissions(dir, 'wx');
        if (err) {
          return err;
        }
        if (isdir) {
          if (!FS.isDir(node.mode)) {
            return 20;
          }
          if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
            return 16;
          }
        } else {
          if (FS.isDir(node.mode)) {
            return 21;
          }
        }
        return 0;
      },mayOpen:function (node, flags) {
        if (!node) {
          return 2;
        }
        if (FS.isLink(node.mode)) {
          return 40;
        } else if (FS.isDir(node.mode)) {
          if (FS.flagsToPermissionString(flags) !== 'r' || // opening for write
              (flags & 512)) { // TODO: check for O_SEARCH? (== search for dir only)
            return 21;
          }
        }
        return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
      },MAX_OPEN_FDS:4096,nextfd:function (fd_start, fd_end) {
        fd_start = fd_start || 0;
        fd_end = fd_end || FS.MAX_OPEN_FDS;
        for (var fd = fd_start; fd <= fd_end; fd++) {
          if (!FS.streams[fd]) {
            return fd;
          }
        }
        throw new FS.ErrnoError(24);
      },getStream:function (fd) {
        return FS.streams[fd];
      },createStream:function (stream, fd_start, fd_end) {
        if (!FS.FSStream) {
          FS.FSStream = function(){};
          FS.FSStream.prototype = {};
          // compatibility
          Object.defineProperties(FS.FSStream.prototype, {
            object: {
              get: function() { return this.node; },
              set: function(val) { this.node = val; }
            },
            isRead: {
              get: function() { return (this.flags & 2097155) !== 1; }
            },
            isWrite: {
              get: function() { return (this.flags & 2097155) !== 0; }
            },
            isAppend: {
              get: function() { return (this.flags & 1024); }
            }
          });
        }
        // clone it, so we can return an instance of FSStream
        var newStream = new FS.FSStream();
        for (var p in stream) {
          newStream[p] = stream[p];
        }
        stream = newStream;
        var fd = FS.nextfd(fd_start, fd_end);
        stream.fd = fd;
        FS.streams[fd] = stream;
        return stream;
      },closeStream:function (fd) {
        FS.streams[fd] = null;
      },chrdev_stream_ops:{open:function (stream) {
          var device = FS.getDevice(stream.node.rdev);
          // override node's stream ops with the device's
          stream.stream_ops = device.stream_ops;
          // forward the open call
          if (stream.stream_ops.open) {
            stream.stream_ops.open(stream);
          }
        },llseek:function () {
          throw new FS.ErrnoError(29);
        }},major:function (dev) {
        return ((dev) >> 8);
      },minor:function (dev) {
        return ((dev) & 0xff);
      },makedev:function (ma, mi) {
        return ((ma) << 8 | (mi));
      },registerDevice:function (dev, ops) {
        FS.devices[dev] = { stream_ops: ops };
      },getDevice:function (dev) {
        return FS.devices[dev];
      },getMounts:function (mount) {
        var mounts = [];
        var check = [mount];
  
        while (check.length) {
          var m = check.pop();
  
          mounts.push(m);
  
          check.push.apply(check, m.mounts);
        }
  
        return mounts;
      },syncfs:function (populate, callback) {
        if (typeof(populate) === 'function') {
          callback = populate;
          populate = false;
        }
  
        FS.syncFSRequests++;
  
        if (FS.syncFSRequests > 1) {
          console.log('warning: ' + FS.syncFSRequests + ' FS.syncfs operations in flight at once, probably just doing extra work');
        }
  
        var mounts = FS.getMounts(FS.root.mount);
        var completed = 0;
  
        function doCallback(err) {
          assert(FS.syncFSRequests > 0);
          FS.syncFSRequests--;
          return callback(err);
        }
  
        function done(err) {
          if (err) {
            if (!done.errored) {
              done.errored = true;
              return doCallback(err);
            }
            return;
          }
          if (++completed >= mounts.length) {
            doCallback(null);
          }
        };
  
        // sync all mounts
        mounts.forEach(function (mount) {
          if (!mount.type.syncfs) {
            return done(null);
          }
          mount.type.syncfs(mount, populate, done);
        });
      },mount:function (type, opts, mountpoint) {
        var root = mountpoint === '/';
        var pseudo = !mountpoint;
        var node;
  
        if (root && FS.root) {
          throw new FS.ErrnoError(16);
        } else if (!root && !pseudo) {
          var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
  
          mountpoint = lookup.path;  // use the absolute path
          node = lookup.node;
  
          if (FS.isMountpoint(node)) {
            throw new FS.ErrnoError(16);
          }
  
          if (!FS.isDir(node.mode)) {
            throw new FS.ErrnoError(20);
          }
        }
  
        var mount = {
          type: type,
          opts: opts,
          mountpoint: mountpoint,
          mounts: []
        };
  
        // create a root node for the fs
        var mountRoot = type.mount(mount);
        mountRoot.mount = mount;
        mount.root = mountRoot;
  
        if (root) {
          FS.root = mountRoot;
        } else if (node) {
          // set as a mountpoint
          node.mounted = mount;
  
          // add the new mount to the current mount's children
          if (node.mount) {
            node.mount.mounts.push(mount);
          }
        }
  
        return mountRoot;
      },unmount:function (mountpoint) {
        var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
  
        if (!FS.isMountpoint(lookup.node)) {
          throw new FS.ErrnoError(22);
        }
  
        // destroy the nodes for this mount, and all its child mounts
        var node = lookup.node;
        var mount = node.mounted;
        var mounts = FS.getMounts(mount);
  
        Object.keys(FS.nameTable).forEach(function (hash) {
          var current = FS.nameTable[hash];
  
          while (current) {
            var next = current.name_next;
  
            if (mounts.indexOf(current.mount) !== -1) {
              FS.destroyNode(current);
            }
  
            current = next;
          }
        });
  
        // no longer a mountpoint
        node.mounted = null;
  
        // remove this mount from the child mounts
        var idx = node.mount.mounts.indexOf(mount);
        assert(idx !== -1);
        node.mount.mounts.splice(idx, 1);
      },lookup:function (parent, name) {
        return parent.node_ops.lookup(parent, name);
      },mknod:function (path, mode, dev) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        if (!name || name === '.' || name === '..') {
          throw new FS.ErrnoError(22);
        }
        var err = FS.mayCreate(parent, name);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.mknod) {
          throw new FS.ErrnoError(1);
        }
        return parent.node_ops.mknod(parent, name, mode, dev);
      },create:function (path, mode) {
        mode = mode !== undefined ? mode : 438 /* 0666 */;
        mode &= 4095;
        mode |= 32768;
        return FS.mknod(path, mode, 0);
      },mkdir:function (path, mode) {
        mode = mode !== undefined ? mode : 511 /* 0777 */;
        mode &= 511 | 512;
        mode |= 16384;
        return FS.mknod(path, mode, 0);
      },mkdirTree:function (path, mode) {
        var dirs = path.split('/');
        var d = '';
        for (var i = 0; i < dirs.length; ++i) {
          if (!dirs[i]) continue;
          d += '/' + dirs[i];
          try {
            FS.mkdir(d, mode);
          } catch(e) {
            if (e.errno != 17) throw e;
          }
        }
      },mkdev:function (path, mode, dev) {
        if (typeof(dev) === 'undefined') {
          dev = mode;
          mode = 438 /* 0666 */;
        }
        mode |= 8192;
        return FS.mknod(path, mode, dev);
      },symlink:function (oldpath, newpath) {
        if (!PATH.resolve(oldpath)) {
          throw new FS.ErrnoError(2);
        }
        var lookup = FS.lookupPath(newpath, { parent: true });
        var parent = lookup.node;
        if (!parent) {
          throw new FS.ErrnoError(2);
        }
        var newname = PATH.basename(newpath);
        var err = FS.mayCreate(parent, newname);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.symlink) {
          throw new FS.ErrnoError(1);
        }
        return parent.node_ops.symlink(parent, newname, oldpath);
      },rename:function (old_path, new_path) {
        var old_dirname = PATH.dirname(old_path);
        var new_dirname = PATH.dirname(new_path);
        var old_name = PATH.basename(old_path);
        var new_name = PATH.basename(new_path);
        // parents must exist
        var lookup, old_dir, new_dir;
        try {
          lookup = FS.lookupPath(old_path, { parent: true });
          old_dir = lookup.node;
          lookup = FS.lookupPath(new_path, { parent: true });
          new_dir = lookup.node;
        } catch (e) {
          throw new FS.ErrnoError(16);
        }
        if (!old_dir || !new_dir) throw new FS.ErrnoError(2);
        // need to be part of the same mount
        if (old_dir.mount !== new_dir.mount) {
          throw new FS.ErrnoError(18);
        }
        // source must exist
        var old_node = FS.lookupNode(old_dir, old_name);
        // old path should not be an ancestor of the new path
        var relative = PATH.relative(old_path, new_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(22);
        }
        // new path should not be an ancestor of the old path
        relative = PATH.relative(new_path, old_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(39);
        }
        // see if the new path already exists
        var new_node;
        try {
          new_node = FS.lookupNode(new_dir, new_name);
        } catch (e) {
          // not fatal
        }
        // early out if nothing needs to change
        if (old_node === new_node) {
          return;
        }
        // we'll need to delete the old entry
        var isdir = FS.isDir(old_node.mode);
        var err = FS.mayDelete(old_dir, old_name, isdir);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        // need delete permissions if we'll be overwriting.
        // need create permissions if new doesn't already exist.
        err = new_node ?
          FS.mayDelete(new_dir, new_name, isdir) :
          FS.mayCreate(new_dir, new_name);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!old_dir.node_ops.rename) {
          throw new FS.ErrnoError(1);
        }
        if (FS.isMountpoint(old_node) || (new_node && FS.isMountpoint(new_node))) {
          throw new FS.ErrnoError(16);
        }
        // if we are going to change the parent, check write permissions
        if (new_dir !== old_dir) {
          err = FS.nodePermissions(old_dir, 'w');
          if (err) {
            throw new FS.ErrnoError(err);
          }
        }
        try {
          if (FS.trackingDelegate['willMovePath']) {
            FS.trackingDelegate['willMovePath'](old_path, new_path);
          }
        } catch(e) {
          console.log("FS.trackingDelegate['willMovePath']('"+old_path+"', '"+new_path+"') threw an exception: " + e.message);
        }
        // remove the node from the lookup hash
        FS.hashRemoveNode(old_node);
        // do the underlying fs rename
        try {
          old_dir.node_ops.rename(old_node, new_dir, new_name);
        } catch (e) {
          throw e;
        } finally {
          // add the node back to the hash (in case node_ops.rename
          // changed its name)
          FS.hashAddNode(old_node);
        }
        try {
          if (FS.trackingDelegate['onMovePath']) FS.trackingDelegate['onMovePath'](old_path, new_path);
        } catch(e) {
          console.log("FS.trackingDelegate['onMovePath']('"+old_path+"', '"+new_path+"') threw an exception: " + e.message);
        }
      },rmdir:function (path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var err = FS.mayDelete(parent, name, true);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.rmdir) {
          throw new FS.ErrnoError(1);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(16);
        }
        try {
          if (FS.trackingDelegate['willDeletePath']) {
            FS.trackingDelegate['willDeletePath'](path);
          }
        } catch(e) {
          console.log("FS.trackingDelegate['willDeletePath']('"+path+"') threw an exception: " + e.message);
        }
        parent.node_ops.rmdir(parent, name);
        FS.destroyNode(node);
        try {
          if (FS.trackingDelegate['onDeletePath']) FS.trackingDelegate['onDeletePath'](path);
        } catch(e) {
          console.log("FS.trackingDelegate['onDeletePath']('"+path+"') threw an exception: " + e.message);
        }
      },readdir:function (path) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        if (!node.node_ops.readdir) {
          throw new FS.ErrnoError(20);
        }
        return node.node_ops.readdir(node);
      },unlink:function (path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var err = FS.mayDelete(parent, name, false);
        if (err) {
          // According to POSIX, we should map EISDIR to EPERM, but
          // we instead do what Linux does (and we must, as we use
          // the musl linux libc).
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.unlink) {
          throw new FS.ErrnoError(1);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(16);
        }
        try {
          if (FS.trackingDelegate['willDeletePath']) {
            FS.trackingDelegate['willDeletePath'](path);
          }
        } catch(e) {
          console.log("FS.trackingDelegate['willDeletePath']('"+path+"') threw an exception: " + e.message);
        }
        parent.node_ops.unlink(parent, name);
        FS.destroyNode(node);
        try {
          if (FS.trackingDelegate['onDeletePath']) FS.trackingDelegate['onDeletePath'](path);
        } catch(e) {
          console.log("FS.trackingDelegate['onDeletePath']('"+path+"') threw an exception: " + e.message);
        }
      },readlink:function (path) {
        var lookup = FS.lookupPath(path);
        var link = lookup.node;
        if (!link) {
          throw new FS.ErrnoError(2);
        }
        if (!link.node_ops.readlink) {
          throw new FS.ErrnoError(22);
        }
        return PATH.resolve(FS.getPath(link.parent), link.node_ops.readlink(link));
      },stat:function (path, dontFollow) {
        var lookup = FS.lookupPath(path, { follow: !dontFollow });
        var node = lookup.node;
        if (!node) {
          throw new FS.ErrnoError(2);
        }
        if (!node.node_ops.getattr) {
          throw new FS.ErrnoError(1);
        }
        return node.node_ops.getattr(node);
      },lstat:function (path) {
        return FS.stat(path, true);
      },chmod:function (path, mode, dontFollow) {
        var node;
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(1);
        }
        node.node_ops.setattr(node, {
          mode: (mode & 4095) | (node.mode & ~4095),
          timestamp: Date.now()
        });
      },lchmod:function (path, mode) {
        FS.chmod(path, mode, true);
      },fchmod:function (fd, mode) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(9);
        }
        FS.chmod(stream.node, mode);
      },chown:function (path, uid, gid, dontFollow) {
        var node;
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(1);
        }
        node.node_ops.setattr(node, {
          timestamp: Date.now()
          // we ignore the uid / gid for now
        });
      },lchown:function (path, uid, gid) {
        FS.chown(path, uid, gid, true);
      },fchown:function (fd, uid, gid) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(9);
        }
        FS.chown(stream.node, uid, gid);
      },truncate:function (path, len) {
        if (len < 0) {
          throw new FS.ErrnoError(22);
        }
        var node;
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: true });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(1);
        }
        if (FS.isDir(node.mode)) {
          throw new FS.ErrnoError(21);
        }
        if (!FS.isFile(node.mode)) {
          throw new FS.ErrnoError(22);
        }
        var err = FS.nodePermissions(node, 'w');
        if (err) {
          throw new FS.ErrnoError(err);
        }
        node.node_ops.setattr(node, {
          size: len,
          timestamp: Date.now()
        });
      },ftruncate:function (fd, len) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(9);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(22);
        }
        FS.truncate(stream.node, len);
      },utime:function (path, atime, mtime) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        node.node_ops.setattr(node, {
          timestamp: Math.max(atime, mtime)
        });
      },open:function (path, flags, mode, fd_start, fd_end) {
        if (path === "") {
          throw new FS.ErrnoError(2);
        }
        flags = typeof flags === 'string' ? FS.modeStringToFlags(flags) : flags;
        mode = typeof mode === 'undefined' ? 438 /* 0666 */ : mode;
        if ((flags & 64)) {
          mode = (mode & 4095) | 32768;
        } else {
          mode = 0;
        }
        var node;
        if (typeof path === 'object') {
          node = path;
        } else {
          path = PATH.normalize(path);
          try {
            var lookup = FS.lookupPath(path, {
              follow: !(flags & 131072)
            });
            node = lookup.node;
          } catch (e) {
            // ignore
          }
        }
        // perhaps we need to create the node
        var created = false;
        if ((flags & 64)) {
          if (node) {
            // if O_CREAT and O_EXCL are set, error out if the node already exists
            if ((flags & 128)) {
              throw new FS.ErrnoError(17);
            }
          } else {
            // node doesn't exist, try to create it
            node = FS.mknod(path, mode, 0);
            created = true;
          }
        }
        if (!node) {
          throw new FS.ErrnoError(2);
        }
        // can't truncate a device
        if (FS.isChrdev(node.mode)) {
          flags &= ~512;
        }
        // if asked only for a directory, then this must be one
        if ((flags & 65536) && !FS.isDir(node.mode)) {
          throw new FS.ErrnoError(20);
        }
        // check permissions, if this is not a file we just created now (it is ok to
        // create and write to a file with read-only permissions; it is read-only
        // for later use)
        if (!created) {
          var err = FS.mayOpen(node, flags);
          if (err) {
            throw new FS.ErrnoError(err);
          }
        }
        // do truncation if necessary
        if ((flags & 512)) {
          FS.truncate(node, 0);
        }
        // we've already handled these, don't pass down to the underlying vfs
        flags &= ~(128 | 512);
  
        // register the stream with the filesystem
        var stream = FS.createStream({
          node: node,
          path: FS.getPath(node),  // we want the absolute path to the node
          flags: flags,
          seekable: true,
          position: 0,
          stream_ops: node.stream_ops,
          // used by the file family libc calls (fopen, fwrite, ferror, etc.)
          ungotten: [],
          error: false
        }, fd_start, fd_end);
        // call the new stream's open function
        if (stream.stream_ops.open) {
          stream.stream_ops.open(stream);
        }
        if (Module['logReadFiles'] && !(flags & 1)) {
          if (!FS.readFiles) FS.readFiles = {};
          if (!(path in FS.readFiles)) {
            FS.readFiles[path] = 1;
            console.log("FS.trackingDelegate error on read file: " + path);
          }
        }
        try {
          if (FS.trackingDelegate['onOpenFile']) {
            var trackingFlags = 0;
            if ((flags & 2097155) !== 1) {
              trackingFlags |= FS.tracking.openFlags.READ;
            }
            if ((flags & 2097155) !== 0) {
              trackingFlags |= FS.tracking.openFlags.WRITE;
            }
            FS.trackingDelegate['onOpenFile'](path, trackingFlags);
          }
        } catch(e) {
          console.log("FS.trackingDelegate['onOpenFile']('"+path+"', flags) threw an exception: " + e.message);
        }
        return stream;
      },close:function (stream) {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(9);
        }
        if (stream.getdents) stream.getdents = null; // free readdir state
        try {
          if (stream.stream_ops.close) {
            stream.stream_ops.close(stream);
          }
        } catch (e) {
          throw e;
        } finally {
          FS.closeStream(stream.fd);
        }
        stream.fd = null;
      },isClosed:function (stream) {
        return stream.fd === null;
      },llseek:function (stream, offset, whence) {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(9);
        }
        if (!stream.seekable || !stream.stream_ops.llseek) {
          throw new FS.ErrnoError(29);
        }
        if (whence != 0 /* SEEK_SET */ && whence != 1 /* SEEK_CUR */ && whence != 2 /* SEEK_END */) {
          throw new FS.ErrnoError(22);
        }
        stream.position = stream.stream_ops.llseek(stream, offset, whence);
        stream.ungotten = [];
        return stream.position;
      },read:function (stream, buffer, offset, length, position) {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(22);
        }
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(9);
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(9);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(21);
        }
        if (!stream.stream_ops.read) {
          throw new FS.ErrnoError(22);
        }
        var seeking = typeof position !== 'undefined';
        if (!seeking) {
          position = stream.position;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(29);
        }
        var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
        if (!seeking) stream.position += bytesRead;
        return bytesRead;
      },write:function (stream, buffer, offset, length, position, canOwn) {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(22);
        }
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(9);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(9);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(21);
        }
        if (!stream.stream_ops.write) {
          throw new FS.ErrnoError(22);
        }
        if (stream.flags & 1024) {
          // seek to the end before writing in append mode
          FS.llseek(stream, 0, 2);
        }
        var seeking = typeof position !== 'undefined';
        if (!seeking) {
          position = stream.position;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(29);
        }
        var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
        if (!seeking) stream.position += bytesWritten;
        try {
          if (stream.path && FS.trackingDelegate['onWriteToFile']) FS.trackingDelegate['onWriteToFile'](stream.path);
        } catch(e) {
          console.log("FS.trackingDelegate['onWriteToFile']('"+stream.path+"') threw an exception: " + e.message);
        }
        return bytesWritten;
      },allocate:function (stream, offset, length) {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(9);
        }
        if (offset < 0 || length <= 0) {
          throw new FS.ErrnoError(22);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(9);
        }
        if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(19);
        }
        if (!stream.stream_ops.allocate) {
          throw new FS.ErrnoError(95);
        }
        stream.stream_ops.allocate(stream, offset, length);
      },mmap:function (stream, buffer, offset, length, position, prot, flags) {
        // TODO if PROT is PROT_WRITE, make sure we have write access
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(13);
        }
        if (!stream.stream_ops.mmap) {
          throw new FS.ErrnoError(19);
        }
        return stream.stream_ops.mmap(stream, buffer, offset, length, position, prot, flags);
      },msync:function (stream, buffer, offset, length, mmapFlags) {
        if (!stream || !stream.stream_ops.msync) {
          return 0;
        }
        return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags);
      },munmap:function (stream) {
        return 0;
      },ioctl:function (stream, cmd, arg) {
        if (!stream.stream_ops.ioctl) {
          throw new FS.ErrnoError(25);
        }
        return stream.stream_ops.ioctl(stream, cmd, arg);
      },readFile:function (path, opts) {
        opts = opts || {};
        opts.flags = opts.flags || 'r';
        opts.encoding = opts.encoding || 'binary';
        if (opts.encoding !== 'utf8' && opts.encoding !== 'binary') {
          throw new Error('Invalid encoding type "' + opts.encoding + '"');
        }
        var ret;
        var stream = FS.open(path, opts.flags);
        var stat = FS.stat(path);
        var length = stat.size;
        var buf = new Uint8Array(length);
        FS.read(stream, buf, 0, length, 0);
        if (opts.encoding === 'utf8') {
          ret = UTF8ArrayToString(buf, 0);
        } else if (opts.encoding === 'binary') {
          ret = buf;
        }
        FS.close(stream);
        return ret;
      },writeFile:function (path, data, opts) {
        opts = opts || {};
        opts.flags = opts.flags || 'w';
        var stream = FS.open(path, opts.flags, opts.mode);
        if (typeof data === 'string') {
          var buf = new Uint8Array(lengthBytesUTF8(data)+1);
          var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
          FS.write(stream, buf, 0, actualNumBytes, undefined, opts.canOwn);
        } else if (ArrayBuffer.isView(data)) {
          FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn);
        } else {
          throw new Error('Unsupported data type');
        }
        FS.close(stream);
      },cwd:function () {
        return FS.currentPath;
      },chdir:function (path) {
        var lookup = FS.lookupPath(path, { follow: true });
        if (lookup.node === null) {
          throw new FS.ErrnoError(2);
        }
        if (!FS.isDir(lookup.node.mode)) {
          throw new FS.ErrnoError(20);
        }
        var err = FS.nodePermissions(lookup.node, 'x');
        if (err) {
          throw new FS.ErrnoError(err);
        }
        FS.currentPath = lookup.path;
      },createDefaultDirectories:function () {
        FS.mkdir('/tmp');
        FS.mkdir('/home');
        FS.mkdir('/home/web_user');
      },createDefaultDevices:function () {
        // create /dev
        FS.mkdir('/dev');
        // setup /dev/null
        FS.registerDevice(FS.makedev(1, 3), {
          read: function() { return 0; },
          write: function(stream, buffer, offset, length, pos) { return length; }
        });
        FS.mkdev('/dev/null', FS.makedev(1, 3));
        // setup /dev/tty and /dev/tty1
        // stderr needs to print output using Module['printErr']
        // so we register a second tty just for it.
        TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
        TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
        FS.mkdev('/dev/tty', FS.makedev(5, 0));
        FS.mkdev('/dev/tty1', FS.makedev(6, 0));
        // setup /dev/[u]random
        var random_device;
        if (typeof crypto === 'object' && typeof crypto['getRandomValues'] === 'function') {
          // for modern web browsers
          var randomBuffer = new Uint8Array(1);
          random_device = function() { crypto.getRandomValues(randomBuffer); return randomBuffer[0]; };
        } else
        if (ENVIRONMENT_IS_NODE) {
          // for nodejs with or without crypto support included
          try {
            var crypto_module = require('crypto');
            // nodejs has crypto support
            random_device = function() { return crypto_module['randomBytes'](1)[0]; };
          } catch (e) {
            // nodejs doesn't have crypto support
          }
        } else
        {}
        if (!random_device) {
          // we couldn't find a proper implementation, as Math.random() is not suitable for /dev/random, see emscripten-core/emscripten/pull/7096
          random_device = function() { abort("no cryptographic support found for random_device. consider polyfilling it if you want to use something insecure like Math.random(), e.g. put this in a --pre-js: var crypto = { getRandomValues: function(array) { for (var i = 0; i < array.length; i++) array[i] = (Math.random()*256)|0 } };"); };
        }
        FS.createDevice('/dev', 'random', random_device);
        FS.createDevice('/dev', 'urandom', random_device);
        // we're not going to emulate the actual shm device,
        // just create the tmp dirs that reside in it commonly
        FS.mkdir('/dev/shm');
        FS.mkdir('/dev/shm/tmp');
      },createSpecialDirectories:function () {
        // create /proc/self/fd which allows /proc/self/fd/6 => readlink gives the name of the stream for fd 6 (see test_unistd_ttyname)
        FS.mkdir('/proc');
        FS.mkdir('/proc/self');
        FS.mkdir('/proc/self/fd');
        FS.mount({
          mount: function() {
            var node = FS.createNode('/proc/self', 'fd', 16384 | 511 /* 0777 */, 73);
            node.node_ops = {
              lookup: function(parent, name) {
                var fd = +name;
                var stream = FS.getStream(fd);
                if (!stream) throw new FS.ErrnoError(9);
                var ret = {
                  parent: null,
                  mount: { mountpoint: 'fake' },
                  node_ops: { readlink: function() { return stream.path } }
                };
                ret.parent = ret; // make it look like a simple root node
                return ret;
              }
            };
            return node;
          }
        }, {}, '/proc/self/fd');
      },createStandardStreams:function () {
        // TODO deprecate the old functionality of a single
        // input / output callback and that utilizes FS.createDevice
        // and instead require a unique set of stream ops
  
        // by default, we symlink the standard streams to the
        // default tty devices. however, if the standard streams
        // have been overwritten we create a unique device for
        // them instead.
        if (Module['stdin']) {
          FS.createDevice('/dev', 'stdin', Module['stdin']);
        } else {
          FS.symlink('/dev/tty', '/dev/stdin');
        }
        if (Module['stdout']) {
          FS.createDevice('/dev', 'stdout', null, Module['stdout']);
        } else {
          FS.symlink('/dev/tty', '/dev/stdout');
        }
        if (Module['stderr']) {
          FS.createDevice('/dev', 'stderr', null, Module['stderr']);
        } else {
          FS.symlink('/dev/tty1', '/dev/stderr');
        }
  
        // open default streams for the stdin, stdout and stderr devices
        var stdin = FS.open('/dev/stdin', 'r');
        var stdout = FS.open('/dev/stdout', 'w');
        var stderr = FS.open('/dev/stderr', 'w');
        assert(stdin.fd === 0, 'invalid handle for stdin (' + stdin.fd + ')');
        assert(stdout.fd === 1, 'invalid handle for stdout (' + stdout.fd + ')');
        assert(stderr.fd === 2, 'invalid handle for stderr (' + stderr.fd + ')');
      },ensureErrnoError:function () {
        if (FS.ErrnoError) return;
        FS.ErrnoError = function ErrnoError(errno, node) {
          this.node = node;
          this.setErrno = function(errno) {
            this.errno = errno;
            for (var key in ERRNO_CODES) {
              if (ERRNO_CODES[key] === errno) {
                this.code = key;
                break;
              }
            }
          };
          this.setErrno(errno);
          this.message = ERRNO_MESSAGES[errno];
          // Node.js compatibility: assigning on this.stack fails on Node 4 (but fixed on Node 8)
          if (this.stack) Object.defineProperty(this, "stack", { value: (new Error).stack, writable: true });
          if (this.stack) this.stack = demangleAll(this.stack);
        };
        FS.ErrnoError.prototype = new Error();
        FS.ErrnoError.prototype.constructor = FS.ErrnoError;
        // Some errors may happen quite a bit, to avoid overhead we reuse them (and suffer a lack of stack info)
        [2].forEach(function(code) {
          FS.genericErrors[code] = new FS.ErrnoError(code);
          FS.genericErrors[code].stack = '<generic error, no stack>';
        });
      },staticInit:function () {
        FS.ensureErrnoError();
  
        FS.nameTable = new Array(4096);
  
        FS.mount(MEMFS, {}, '/');
  
        FS.createDefaultDirectories();
        FS.createDefaultDevices();
        FS.createSpecialDirectories();
  
        FS.filesystems = {
          'MEMFS': MEMFS,
          'IDBFS': IDBFS,
          'NODEFS': NODEFS,
          'WORKERFS': WORKERFS,
        };
      },init:function (input, output, error) {
        assert(!FS.init.initialized, 'FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)');
        FS.init.initialized = true;
  
        FS.ensureErrnoError();
  
        // Allow Module.stdin etc. to provide defaults, if none explicitly passed to us here
        Module['stdin'] = input || Module['stdin'];
        Module['stdout'] = output || Module['stdout'];
        Module['stderr'] = error || Module['stderr'];
  
        FS.createStandardStreams();
      },quit:function () {
        FS.init.initialized = false;
        // force-flush all streams, so we get musl std streams printed out
        var fflush = Module['_fflush'];
        if (fflush) fflush(0);
        // close all of our streams
        for (var i = 0; i < FS.streams.length; i++) {
          var stream = FS.streams[i];
          if (!stream) {
            continue;
          }
          FS.close(stream);
        }
      },getMode:function (canRead, canWrite) {
        var mode = 0;
        if (canRead) mode |= 292 | 73;
        if (canWrite) mode |= 146;
        return mode;
      },joinPath:function (parts, forceRelative) {
        var path = PATH.join.apply(null, parts);
        if (forceRelative && path[0] == '/') path = path.substr(1);
        return path;
      },absolutePath:function (relative, base) {
        return PATH.resolve(base, relative);
      },standardizePath:function (path) {
        return PATH.normalize(path);
      },findObject:function (path, dontResolveLastLink) {
        var ret = FS.analyzePath(path, dontResolveLastLink);
        if (ret.exists) {
          return ret.object;
        } else {
          ___setErrNo(ret.error);
          return null;
        }
      },analyzePath:function (path, dontResolveLastLink) {
        // operate from within the context of the symlink's target
        try {
          var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          path = lookup.path;
        } catch (e) {
        }
        var ret = {
          isRoot: false, exists: false, error: 0, name: null, path: null, object: null,
          parentExists: false, parentPath: null, parentObject: null
        };
        try {
          var lookup = FS.lookupPath(path, { parent: true });
          ret.parentExists = true;
          ret.parentPath = lookup.path;
          ret.parentObject = lookup.node;
          ret.name = PATH.basename(path);
          lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          ret.exists = true;
          ret.path = lookup.path;
          ret.object = lookup.node;
          ret.name = lookup.node.name;
          ret.isRoot = lookup.path === '/';
        } catch (e) {
          ret.error = e.errno;
        };
        return ret;
      },createFolder:function (parent, name, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(canRead, canWrite);
        return FS.mkdir(path, mode);
      },createPath:function (parent, path, canRead, canWrite) {
        parent = typeof parent === 'string' ? parent : FS.getPath(parent);
        var parts = path.split('/').reverse();
        while (parts.length) {
          var part = parts.pop();
          if (!part) continue;
          var current = PATH.join2(parent, part);
          try {
            FS.mkdir(current);
          } catch (e) {
            // ignore EEXIST
          }
          parent = current;
        }
        return current;
      },createFile:function (parent, name, properties, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(canRead, canWrite);
        return FS.create(path, mode);
      },createDataFile:function (parent, name, data, canRead, canWrite, canOwn) {
        var path = name ? PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name) : parent;
        var mode = FS.getMode(canRead, canWrite);
        var node = FS.create(path, mode);
        if (data) {
          if (typeof data === 'string') {
            var arr = new Array(data.length);
            for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i);
            data = arr;
          }
          // make sure we can write to the file
          FS.chmod(node, mode | 146);
          var stream = FS.open(node, 'w');
          FS.write(stream, data, 0, data.length, 0, canOwn);
          FS.close(stream);
          FS.chmod(node, mode);
        }
        return node;
      },createDevice:function (parent, name, input, output) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(!!input, !!output);
        if (!FS.createDevice.major) FS.createDevice.major = 64;
        var dev = FS.makedev(FS.createDevice.major++, 0);
        // Create a fake device that a set of stream ops to emulate
        // the old behavior.
        FS.registerDevice(dev, {
          open: function(stream) {
            stream.seekable = false;
          },
          close: function(stream) {
            // flush any pending line data
            if (output && output.buffer && output.buffer.length) {
              output(10);
            }
          },
          read: function(stream, buffer, offset, length, pos /* ignored */) {
            var bytesRead = 0;
            for (var i = 0; i < length; i++) {
              var result;
              try {
                result = input();
              } catch (e) {
                throw new FS.ErrnoError(5);
              }
              if (result === undefined && bytesRead === 0) {
                throw new FS.ErrnoError(11);
              }
              if (result === null || result === undefined) break;
              bytesRead++;
              buffer[offset+i] = result;
            }
            if (bytesRead) {
              stream.node.timestamp = Date.now();
            }
            return bytesRead;
          },
          write: function(stream, buffer, offset, length, pos) {
            for (var i = 0; i < length; i++) {
              try {
                output(buffer[offset+i]);
              } catch (e) {
                throw new FS.ErrnoError(5);
              }
            }
            if (length) {
              stream.node.timestamp = Date.now();
            }
            return i;
          }
        });
        return FS.mkdev(path, mode, dev);
      },createLink:function (parent, name, target, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        return FS.symlink(target, path);
      },forceLoadFile:function (obj) {
        if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
        var success = true;
        if (typeof XMLHttpRequest !== 'undefined') {
          throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
        } else if (Module['read']) {
          // Command-line.
          try {
            // WARNING: Can't read binary files in V8's d8 or tracemonkey's js, as
            //          read() will try to parse UTF8.
            obj.contents = intArrayFromString(Module['read'](obj.url), true);
            obj.usedBytes = obj.contents.length;
          } catch (e) {
            success = false;
          }
        } else {
          throw new Error('Cannot load without read() or XMLHttpRequest.');
        }
        if (!success) ___setErrNo(5);
        return success;
      },createLazyFile:function (parent, name, url, canRead, canWrite) {
        // Lazy chunked Uint8Array (implements get and length from Uint8Array). Actual getting is abstracted away for eventual reuse.
        function LazyUint8Array() {
          this.lengthKnown = false;
          this.chunks = []; // Loaded chunks. Index is the chunk number
        }
        LazyUint8Array.prototype.get = function LazyUint8Array_get(idx) {
          if (idx > this.length-1 || idx < 0) {
            return undefined;
          }
          var chunkOffset = idx % this.chunkSize;
          var chunkNum = (idx / this.chunkSize)|0;
          return this.getter(chunkNum)[chunkOffset];
        }
        LazyUint8Array.prototype.setDataGetter = function LazyUint8Array_setDataGetter(getter) {
          this.getter = getter;
        }
        LazyUint8Array.prototype.cacheLength = function LazyUint8Array_cacheLength() {
          // Find length
          var xhr = new XMLHttpRequest();
          xhr.open('HEAD', url, false);
          xhr.send(null);
          if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
          var datalength = Number(xhr.getResponseHeader("Content-length"));
          var header;
          var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
          var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
  
          var chunkSize = 1024*1024; // Chunk size in bytes
  
          if (!hasByteServing) chunkSize = datalength;
  
          // Function to get a range from the remote URL.
          var doXHR = (function(from, to) {
            if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
            if (to > datalength-1) throw new Error("only " + datalength + " bytes available! programmer error!");
  
            // TODO: Use mozResponseArrayBuffer, responseStream, etc. if available.
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, false);
            if (datalength !== chunkSize) xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
  
            // Some hints to the browser that we want binary data.
            if (typeof Uint8Array != 'undefined') xhr.responseType = 'arraybuffer';
            if (xhr.overrideMimeType) {
              xhr.overrideMimeType('text/plain; charset=x-user-defined');
            }
  
            xhr.send(null);
            if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
            if (xhr.response !== undefined) {
              return new Uint8Array(xhr.response || []);
            } else {
              return intArrayFromString(xhr.responseText || '', true);
            }
          });
          var lazyArray = this;
          lazyArray.setDataGetter(function(chunkNum) {
            var start = chunkNum * chunkSize;
            var end = (chunkNum+1) * chunkSize - 1; // including this byte
            end = Math.min(end, datalength-1); // if datalength-1 is selected, this is the last block
            if (typeof(lazyArray.chunks[chunkNum]) === "undefined") {
              lazyArray.chunks[chunkNum] = doXHR(start, end);
            }
            if (typeof(lazyArray.chunks[chunkNum]) === "undefined") throw new Error("doXHR failed!");
            return lazyArray.chunks[chunkNum];
          });
  
          if (usesGzip || !datalength) {
            // if the server uses gzip or doesn't supply the length, we have to download the whole file to get the (uncompressed) length
            chunkSize = datalength = 1; // this will force getter(0)/doXHR do download the whole file
            datalength = this.getter(0).length;
            chunkSize = datalength;
            console.log("LazyFiles on gzip forces download of the whole file when length is accessed");
          }
  
          this._length = datalength;
          this._chunkSize = chunkSize;
          this.lengthKnown = true;
        }
        if (typeof XMLHttpRequest !== 'undefined') {
          if (!ENVIRONMENT_IS_WORKER) throw 'Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc';
          var lazyArray = new LazyUint8Array();
          Object.defineProperties(lazyArray, {
            length: {
              get: function() {
                if(!this.lengthKnown) {
                  this.cacheLength();
                }
                return this._length;
              }
            },
            chunkSize: {
              get: function() {
                if(!this.lengthKnown) {
                  this.cacheLength();
                }
                return this._chunkSize;
              }
            }
          });
  
          var properties = { isDevice: false, contents: lazyArray };
        } else {
          var properties = { isDevice: false, url: url };
        }
  
        var node = FS.createFile(parent, name, properties, canRead, canWrite);
        // This is a total hack, but I want to get this lazy file code out of the
        // core of MEMFS. If we want to keep this lazy file concept I feel it should
        // be its own thin LAZYFS proxying calls to MEMFS.
        if (properties.contents) {
          node.contents = properties.contents;
        } else if (properties.url) {
          node.contents = null;
          node.url = properties.url;
        }
        // Add a function that defers querying the file size until it is asked the first time.
        Object.defineProperties(node, {
          usedBytes: {
            get: function() { return this.contents.length; }
          }
        });
        // override each stream op with one that tries to force load the lazy file first
        var stream_ops = {};
        var keys = Object.keys(node.stream_ops);
        keys.forEach(function(key) {
          var fn = node.stream_ops[key];
          stream_ops[key] = function forceLoadLazyFile() {
            if (!FS.forceLoadFile(node)) {
              throw new FS.ErrnoError(5);
            }
            return fn.apply(null, arguments);
          };
        });
        // use a custom read function
        stream_ops.read = function stream_ops_read(stream, buffer, offset, length, position) {
          if (!FS.forceLoadFile(node)) {
            throw new FS.ErrnoError(5);
          }
          var contents = stream.node.contents;
          if (position >= contents.length)
            return 0;
          var size = Math.min(contents.length - position, length);
          assert(size >= 0);
          if (contents.slice) { // normal array
            for (var i = 0; i < size; i++) {
              buffer[offset + i] = contents[position + i];
            }
          } else {
            for (var i = 0; i < size; i++) { // LazyUint8Array from sync binary XHR
              buffer[offset + i] = contents.get(position + i);
            }
          }
          return size;
        };
        node.stream_ops = stream_ops;
        return node;
      },createPreloadedFile:function (parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) {
        Browser.init(); // XXX perhaps this method should move onto Browser?
        // TODO we should allow people to just pass in a complete filename instead
        // of parent and name being that we just join them anyways
        var fullname = name ? PATH.resolve(PATH.join2(parent, name)) : parent;
        var dep = getUniqueRunDependency('cp ' + fullname); // might have several active requests for the same fullname
        function processData(byteArray) {
          function finish(byteArray) {
            if (preFinish) preFinish();
            if (!dontCreateFile) {
              FS.createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
            }
            if (onload) onload();
            removeRunDependency(dep);
          }
          var handled = false;
          Module['preloadPlugins'].forEach(function(plugin) {
            if (handled) return;
            if (plugin['canHandle'](fullname)) {
              plugin['handle'](byteArray, fullname, finish, function() {
                if (onerror) onerror();
                removeRunDependency(dep);
              });
              handled = true;
            }
          });
          if (!handled) finish(byteArray);
        }
        addRunDependency(dep);
        if (typeof url == 'string') {
          Browser.asyncLoad(url, function(byteArray) {
            processData(byteArray);
          }, onerror);
        } else {
          processData(url);
        }
      },indexedDB:function () {
        return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
      },DB_NAME:function () {
        return 'EM_FS_' + window.location.pathname;
      },DB_VERSION:20,DB_STORE_NAME:"FILE_DATA",saveFilesToDB:function (paths, onload, onerror) {
        onload = onload || function(){};
        onerror = onerror || function(){};
        var indexedDB = FS.indexedDB();
        try {
          var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
        } catch (e) {
          return onerror(e);
        }
        openRequest.onupgradeneeded = function openRequest_onupgradeneeded() {
          console.log('creating db');
          var db = openRequest.result;
          db.createObjectStore(FS.DB_STORE_NAME);
        };
        openRequest.onsuccess = function openRequest_onsuccess() {
          var db = openRequest.result;
          var transaction = db.transaction([FS.DB_STORE_NAME], 'readwrite');
          var files = transaction.objectStore(FS.DB_STORE_NAME);
          var ok = 0, fail = 0, total = paths.length;
          function finish() {
            if (fail == 0) onload(); else onerror();
          }
          paths.forEach(function(path) {
            var putRequest = files.put(FS.analyzePath(path).object.contents, path);
            putRequest.onsuccess = function putRequest_onsuccess() { ok++; if (ok + fail == total) finish() };
            putRequest.onerror = function putRequest_onerror() { fail++; if (ok + fail == total) finish() };
          });
          transaction.onerror = onerror;
        };
        openRequest.onerror = onerror;
      },loadFilesFromDB:function (paths, onload, onerror) {
        onload = onload || function(){};
        onerror = onerror || function(){};
        var indexedDB = FS.indexedDB();
        try {
          var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
        } catch (e) {
          return onerror(e);
        }
        openRequest.onupgradeneeded = onerror; // no database to load from
        openRequest.onsuccess = function openRequest_onsuccess() {
          var db = openRequest.result;
          try {
            var transaction = db.transaction([FS.DB_STORE_NAME], 'readonly');
          } catch(e) {
            onerror(e);
            return;
          }
          var files = transaction.objectStore(FS.DB_STORE_NAME);
          var ok = 0, fail = 0, total = paths.length;
          function finish() {
            if (fail == 0) onload(); else onerror();
          }
          paths.forEach(function(path) {
            var getRequest = files.get(path);
            getRequest.onsuccess = function getRequest_onsuccess() {
              if (FS.analyzePath(path).exists) {
                FS.unlink(path);
              }
              FS.createDataFile(PATH.dirname(path), PATH.basename(path), getRequest.result, true, true, true);
              ok++;
              if (ok + fail == total) finish();
            };
            getRequest.onerror = function getRequest_onerror() { fail++; if (ok + fail == total) finish() };
          });
          transaction.onerror = onerror;
        };
        openRequest.onerror = onerror;
      }};var SYSCALLS={DEFAULT_POLLMASK:5,mappings:{},umask:511,calculateAt:function (dirfd, path) {
        if (path[0] !== '/') {
          // relative path
          var dir;
          if (dirfd === -100) {
            dir = FS.cwd();
          } else {
            var dirstream = FS.getStream(dirfd);
            if (!dirstream) throw new FS.ErrnoError(ERRNO_CODES.EBADF);
            dir = dirstream.path;
          }
          path = PATH.join2(dir, path);
        }
        return path;
      },doStat:function (func, path, buf) {
        try {
          var stat = func(path);
        } catch (e) {
          if (e && e.node && PATH.normalize(path) !== PATH.normalize(FS.getPath(e.node))) {
            // an error occurred while trying to look up the path; we should just report ENOTDIR
            return -ERRNO_CODES.ENOTDIR;
          }
          throw e;
        }
        HEAP32[((buf)>>2)]=stat.dev;
        HEAP32[(((buf)+(4))>>2)]=0;
        HEAP32[(((buf)+(8))>>2)]=stat.ino;
        HEAP32[(((buf)+(12))>>2)]=stat.mode;
        HEAP32[(((buf)+(16))>>2)]=stat.nlink;
        HEAP32[(((buf)+(20))>>2)]=stat.uid;
        HEAP32[(((buf)+(24))>>2)]=stat.gid;
        HEAP32[(((buf)+(28))>>2)]=stat.rdev;
        HEAP32[(((buf)+(32))>>2)]=0;
        HEAP32[(((buf)+(36))>>2)]=stat.size;
        HEAP32[(((buf)+(40))>>2)]=4096;
        HEAP32[(((buf)+(44))>>2)]=stat.blocks;
        HEAP32[(((buf)+(48))>>2)]=(stat.atime.getTime() / 1000)|0;
        HEAP32[(((buf)+(52))>>2)]=0;
        HEAP32[(((buf)+(56))>>2)]=(stat.mtime.getTime() / 1000)|0;
        HEAP32[(((buf)+(60))>>2)]=0;
        HEAP32[(((buf)+(64))>>2)]=(stat.ctime.getTime() / 1000)|0;
        HEAP32[(((buf)+(68))>>2)]=0;
        HEAP32[(((buf)+(72))>>2)]=stat.ino;
        return 0;
      },doMsync:function (addr, stream, len, flags) {
        var buffer = new Uint8Array(HEAPU8.subarray(addr, addr + len));
        FS.msync(stream, buffer, 0, len, flags);
      },doMkdir:function (path, mode) {
        // remove a trailing slash, if one - /a/b/ has basename of '', but
        // we want to create b in the context of this function
        path = PATH.normalize(path);
        if (path[path.length-1] === '/') path = path.substr(0, path.length-1);
        FS.mkdir(path, mode, 0);
        return 0;
      },doMknod:function (path, mode, dev) {
        // we don't want this in the JS API as it uses mknod to create all nodes.
        switch (mode & 61440) {
          case 32768:
          case 8192:
          case 24576:
          case 4096:
          case 49152:
            break;
          default: return -ERRNO_CODES.EINVAL;
        }
        FS.mknod(path, mode, dev);
        return 0;
      },doReadlink:function (path, buf, bufsize) {
        if (bufsize <= 0) return -ERRNO_CODES.EINVAL;
        var ret = FS.readlink(path);
  
        var len = Math.min(bufsize, lengthBytesUTF8(ret));
        var endChar = HEAP8[buf+len];
        stringToUTF8(ret, buf, bufsize+1);
        // readlink is one of the rare functions that write out a C string, but does never append a null to the output buffer(!)
        // stringToUTF8() always appends a null byte, so restore the character under the null byte after the write.
        HEAP8[buf+len] = endChar;
  
        return len;
      },doAccess:function (path, amode) {
        if (amode & ~7) {
          // need a valid mode
          return -ERRNO_CODES.EINVAL;
        }
        var node;
        var lookup = FS.lookupPath(path, { follow: true });
        node = lookup.node;
        var perms = '';
        if (amode & 4) perms += 'r';
        if (amode & 2) perms += 'w';
        if (amode & 1) perms += 'x';
        if (perms /* otherwise, they've just passed F_OK */ && FS.nodePermissions(node, perms)) {
          return -ERRNO_CODES.EACCES;
        }
        return 0;
      },doDup:function (path, flags, suggestFD) {
        var suggest = FS.getStream(suggestFD);
        if (suggest) FS.close(suggest);
        return FS.open(path, flags, 0, suggestFD, suggestFD).fd;
      },doReadv:function (stream, iov, iovcnt, offset) {
        var ret = 0;
        for (var i = 0; i < iovcnt; i++) {
          var ptr = HEAP32[(((iov)+(i*8))>>2)];
          var len = HEAP32[(((iov)+(i*8 + 4))>>2)];
          var curr = FS.read(stream, HEAP8,ptr, len, offset);
          if (curr < 0) return -1;
          ret += curr;
          if (curr < len) break; // nothing more to read
        }
        return ret;
      },doWritev:function (stream, iov, iovcnt, offset) {
        var ret = 0;
        for (var i = 0; i < iovcnt; i++) {
          var ptr = HEAP32[(((iov)+(i*8))>>2)];
          var len = HEAP32[(((iov)+(i*8 + 4))>>2)];
          var curr = FS.write(stream, HEAP8,ptr, len, offset);
          if (curr < 0) return -1;
          ret += curr;
        }
        return ret;
      },varargs:0,get:function (varargs) {
        SYSCALLS.varargs += 4;
        var ret = HEAP32[(((SYSCALLS.varargs)-(4))>>2)];
        return ret;
      },getStr:function () {
        var ret = UTF8ToString(SYSCALLS.get());
        return ret;
      },getStreamFromFD:function () {
        var stream = FS.getStream(SYSCALLS.get());
        if (!stream) throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        return stream;
      },getSocketFromFD:function () {
        var socket = SOCKFS.getSocket(SYSCALLS.get());
        if (!socket) throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        return socket;
      },getSocketAddress:function (allowNull) {
        var addrp = SYSCALLS.get(), addrlen = SYSCALLS.get();
        if (allowNull && addrp === 0) return null;
        var info = __read_sockaddr(addrp, addrlen);
        if (info.errno) throw new FS.ErrnoError(info.errno);
        info.addr = DNS.lookup_addr(info.addr) || info.addr;
        return info;
      },get64:function () {
        var low = SYSCALLS.get(), high = SYSCALLS.get();
        if (low >= 0) assert(high === 0);
        else assert(high === -1);
        return low;
      },getZero:function () {
        assert(SYSCALLS.get() === 0);
      }};function ___syscall10(which, varargs) {SYSCALLS.varargs = varargs;
  try {
   // unlink
      var path = SYSCALLS.getStr();
      FS.unlink(path);
      return 0;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }

  
  var SOCKFS={mount:function (mount) {
        // If Module['websocket'] has already been defined (e.g. for configuring
        // the subprotocol/url) use that, if not initialise it to a new object.
        Module['websocket'] = (Module['websocket'] && 
                               ('object' === typeof Module['websocket'])) ? Module['websocket'] : {};
  
        // Add the Event registration mechanism to the exported websocket configuration
        // object so we can register network callbacks from native JavaScript too.
        // For more documentation see system/include/emscripten/emscripten.h
        Module['websocket']._callbacks = {};
        Module['websocket']['on'] = function(event, callback) {
  	    if ('function' === typeof callback) {
  		  this._callbacks[event] = callback;
          }
  	    return this;
        };
  
        Module['websocket'].emit = function(event, param) {
  	    if ('function' === typeof this._callbacks[event]) {
  		  this._callbacks[event].call(this, param);
          }
        };
  
        // If debug is enabled register simple default logging callbacks for each Event.
  
        return FS.createNode(null, '/', 16384 | 511 /* 0777 */, 0);
      },createSocket:function (family, type, protocol) {
        var streaming = type == 1;
        if (protocol) {
          assert(streaming == (protocol == 6)); // if SOCK_STREAM, must be tcp
        }
  
        // create our internal socket structure
        var sock = {
          family: family,
          type: type,
          protocol: protocol,
          server: null,
          error: null, // Used in getsockopt for SOL_SOCKET/SO_ERROR test
          peers: {},
          pending: [],
          recv_queue: [],
          sock_ops: SOCKFS.websocket_sock_ops
        };
  
        // create the filesystem node to store the socket structure
        var name = SOCKFS.nextname();
        var node = FS.createNode(SOCKFS.root, name, 49152, 0);
        node.sock = sock;
  
        // and the wrapping stream that enables library functions such
        // as read and write to indirectly interact with the socket
        var stream = FS.createStream({
          path: name,
          node: node,
          flags: FS.modeStringToFlags('r+'),
          seekable: false,
          stream_ops: SOCKFS.stream_ops
        });
  
        // map the new stream to the socket structure (sockets have a 1:1
        // relationship with a stream)
        sock.stream = stream;
  
        return sock;
      },getSocket:function (fd) {
        var stream = FS.getStream(fd);
        if (!stream || !FS.isSocket(stream.node.mode)) {
          return null;
        }
        return stream.node.sock;
      },stream_ops:{poll:function (stream) {
          var sock = stream.node.sock;
          return sock.sock_ops.poll(sock);
        },ioctl:function (stream, request, varargs) {
          var sock = stream.node.sock;
          return sock.sock_ops.ioctl(sock, request, varargs);
        },read:function (stream, buffer, offset, length, position /* ignored */) {
          var sock = stream.node.sock;
          var msg = sock.sock_ops.recvmsg(sock, length);
          if (!msg) {
            // socket is closed
            return 0;
          }
          buffer.set(msg.buffer, offset);
          return msg.buffer.length;
        },write:function (stream, buffer, offset, length, position /* ignored */) {
          var sock = stream.node.sock;
          return sock.sock_ops.sendmsg(sock, buffer, offset, length);
        },close:function (stream) {
          var sock = stream.node.sock;
          sock.sock_ops.close(sock);
        }},nextname:function () {
        if (!SOCKFS.nextname.current) {
          SOCKFS.nextname.current = 0;
        }
        return 'socket[' + (SOCKFS.nextname.current++) + ']';
      },websocket_sock_ops:{createPeer:function (sock, addr, port) {
          var ws;
  
          if (typeof addr === 'object') {
            ws = addr;
            addr = null;
            port = null;
          }
  
          if (ws) {
            // for sockets that've already connected (e.g. we're the server)
            // we can inspect the _socket property for the address
            if (ws._socket) {
              addr = ws._socket.remoteAddress;
              port = ws._socket.remotePort;
            }
            // if we're just now initializing a connection to the remote,
            // inspect the url property
            else {
              var result = /ws[s]?:\/\/([^:]+):(\d+)/.exec(ws.url);
              if (!result) {
                throw new Error('WebSocket URL must be in the format ws(s)://address:port');
              }
              addr = result[1];
              port = parseInt(result[2], 10);
            }
          } else {
            // create the actual websocket object and connect
            try {
              // runtimeConfig gets set to true if WebSocket runtime configuration is available.
              var runtimeConfig = (Module['websocket'] && ('object' === typeof Module['websocket']));
  
              // The default value is 'ws://' the replace is needed because the compiler replaces '//' comments with '#'
              // comments without checking context, so we'd end up with ws:#, the replace swaps the '#' for '//' again.
              var url = 'ws:#'.replace('#', '//');
  
              if (runtimeConfig) {
                if ('string' === typeof Module['websocket']['url']) {
                  url = Module['websocket']['url']; // Fetch runtime WebSocket URL config.
                }
              }
  
              if (url === 'ws://' || url === 'wss://') { // Is the supplied URL config just a prefix, if so complete it.
                var parts = addr.split('/');
                url = url + parts[0] + ":" + port + "/" + parts.slice(1).join('/');
              }
  
              // Make the WebSocket subprotocol (Sec-WebSocket-Protocol) default to binary if no configuration is set.
              var subProtocols = 'binary'; // The default value is 'binary'
  
              if (runtimeConfig) {
                if ('string' === typeof Module['websocket']['subprotocol']) {
                  subProtocols = Module['websocket']['subprotocol']; // Fetch runtime WebSocket subprotocol config.
                }
              }
  
              // The regex trims the string (removes spaces at the beginning and end, then splits the string by
              // <any space>,<any space> into an Array. Whitespace removal is important for Websockify and ws.
              subProtocols = subProtocols.replace(/^ +| +$/g,"").split(/ *, */);
  
              // The node ws library API for specifying optional subprotocol is slightly different than the browser's.
              var opts = ENVIRONMENT_IS_NODE ? {'protocol': subProtocols.toString()} : subProtocols;
  
              // some webservers (azure) does not support subprotocol header
              if (runtimeConfig && null === Module['websocket']['subprotocol']) {
                subProtocols = 'null';
                opts = undefined;
              }
  
              // If node we use the ws library.
              var WebSocketConstructor;
              if (ENVIRONMENT_IS_NODE) {
                WebSocketConstructor = require('ws');
              } else
              if (ENVIRONMENT_IS_WEB) {
                WebSocketConstructor = window['WebSocket'];
              } else
              {
                WebSocketConstructor = WebSocket;
              }
              ws = new WebSocketConstructor(url, opts);
              ws.binaryType = 'arraybuffer';
            } catch (e) {
              throw new FS.ErrnoError(ERRNO_CODES.EHOSTUNREACH);
            }
          }
  
  
          var peer = {
            addr: addr,
            port: port,
            socket: ws,
            dgram_send_queue: []
          };
  
          SOCKFS.websocket_sock_ops.addPeer(sock, peer);
          SOCKFS.websocket_sock_ops.handlePeerEvents(sock, peer);
  
          // if this is a bound dgram socket, send the port number first to allow
          // us to override the ephemeral port reported to us by remotePort on the
          // remote end.
          if (sock.type === 2 && typeof sock.sport !== 'undefined') {
            peer.dgram_send_queue.push(new Uint8Array([
                255, 255, 255, 255,
                'p'.charCodeAt(0), 'o'.charCodeAt(0), 'r'.charCodeAt(0), 't'.charCodeAt(0),
                ((sock.sport & 0xff00) >> 8) , (sock.sport & 0xff)
            ]));
          }
  
          return peer;
        },getPeer:function (sock, addr, port) {
          return sock.peers[addr + ':' + port];
        },addPeer:function (sock, peer) {
          sock.peers[peer.addr + ':' + peer.port] = peer;
        },removePeer:function (sock, peer) {
          delete sock.peers[peer.addr + ':' + peer.port];
        },handlePeerEvents:function (sock, peer) {
          var first = true;
  
          var handleOpen = function () {
  
            Module['websocket'].emit('open', sock.stream.fd);
  
            try {
              var queued = peer.dgram_send_queue.shift();
              while (queued) {
                peer.socket.send(queued);
                queued = peer.dgram_send_queue.shift();
              }
            } catch (e) {
              // not much we can do here in the way of proper error handling as we've already
              // lied and said this data was sent. shut it down.
              peer.socket.close();
            }
          };
  
          function handleMessage(data) {
            assert(typeof data !== 'string' && data.byteLength !== undefined);  // must receive an ArrayBuffer
  
            // An empty ArrayBuffer will emit a pseudo disconnect event
            // as recv/recvmsg will return zero which indicates that a socket
            // has performed a shutdown although the connection has not been disconnected yet.
            if (data.byteLength == 0) {
              return;
            }
            data = new Uint8Array(data);  // make a typed array view on the array buffer
  
  
            // if this is the port message, override the peer's port with it
            var wasfirst = first;
            first = false;
            if (wasfirst &&
                data.length === 10 &&
                data[0] === 255 && data[1] === 255 && data[2] === 255 && data[3] === 255 &&
                data[4] === 'p'.charCodeAt(0) && data[5] === 'o'.charCodeAt(0) && data[6] === 'r'.charCodeAt(0) && data[7] === 't'.charCodeAt(0)) {
              // update the peer's port and it's key in the peer map
              var newport = ((data[8] << 8) | data[9]);
              SOCKFS.websocket_sock_ops.removePeer(sock, peer);
              peer.port = newport;
              SOCKFS.websocket_sock_ops.addPeer(sock, peer);
              return;
            }
  
            sock.recv_queue.push({ addr: peer.addr, port: peer.port, data: data });
            Module['websocket'].emit('message', sock.stream.fd);
          };
  
          if (ENVIRONMENT_IS_NODE) {
            peer.socket.on('open', handleOpen);
            peer.socket.on('message', function(data, flags) {
              if (!flags.binary) {
                return;
              }
              handleMessage((new Uint8Array(data)).buffer);  // copy from node Buffer -> ArrayBuffer
            });
            peer.socket.on('close', function() {
              Module['websocket'].emit('close', sock.stream.fd);
            });
            peer.socket.on('error', function(error) {
              // Although the ws library may pass errors that may be more descriptive than
              // ECONNREFUSED they are not necessarily the expected error code e.g. 
              // ENOTFOUND on getaddrinfo seems to be node.js specific, so using ECONNREFUSED
              // is still probably the most useful thing to do.
              sock.error = ERRNO_CODES.ECONNREFUSED; // Used in getsockopt for SOL_SOCKET/SO_ERROR test.
              Module['websocket'].emit('error', [sock.stream.fd, sock.error, 'ECONNREFUSED: Connection refused']);
              // don't throw
            });
          } else {
            peer.socket.onopen = handleOpen;
            peer.socket.onclose = function() {
              Module['websocket'].emit('close', sock.stream.fd);
            };
            peer.socket.onmessage = function peer_socket_onmessage(event) {
              handleMessage(event.data);
            };
            peer.socket.onerror = function(error) {
              // The WebSocket spec only allows a 'simple event' to be thrown on error,
              // so we only really know as much as ECONNREFUSED.
              sock.error = ERRNO_CODES.ECONNREFUSED; // Used in getsockopt for SOL_SOCKET/SO_ERROR test.
              Module['websocket'].emit('error', [sock.stream.fd, sock.error, 'ECONNREFUSED: Connection refused']);
            };
          }
        },poll:function (sock) {
          if (sock.type === 1 && sock.server) {
            // listen sockets should only say they're available for reading
            // if there are pending clients.
            return sock.pending.length ? (64 | 1) : 0;
          }
  
          var mask = 0;
          var dest = sock.type === 1 ?  // we only care about the socket state for connection-based sockets
            SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport) :
            null;
  
          if (sock.recv_queue.length ||
              !dest ||  // connection-less sockets are always ready to read
              (dest && dest.socket.readyState === dest.socket.CLOSING) ||
              (dest && dest.socket.readyState === dest.socket.CLOSED)) {  // let recv return 0 once closed
            mask |= (64 | 1);
          }
  
          if (!dest ||  // connection-less sockets are always ready to write
              (dest && dest.socket.readyState === dest.socket.OPEN)) {
            mask |= 4;
          }
  
          if ((dest && dest.socket.readyState === dest.socket.CLOSING) ||
              (dest && dest.socket.readyState === dest.socket.CLOSED)) {
            mask |= 16;
          }
  
          return mask;
        },ioctl:function (sock, request, arg) {
          switch (request) {
            case 21531:
              var bytes = 0;
              if (sock.recv_queue.length) {
                bytes = sock.recv_queue[0].data.length;
              }
              HEAP32[((arg)>>2)]=bytes;
              return 0;
            default:
              return ERRNO_CODES.EINVAL;
          }
        },close:function (sock) {
          // if we've spawned a listen server, close it
          if (sock.server) {
            try {
              sock.server.close();
            } catch (e) {
            }
            sock.server = null;
          }
          // close any peer connections
          var peers = Object.keys(sock.peers);
          for (var i = 0; i < peers.length; i++) {
            var peer = sock.peers[peers[i]];
            try {
              peer.socket.close();
            } catch (e) {
            }
            SOCKFS.websocket_sock_ops.removePeer(sock, peer);
          }
          return 0;
        },bind:function (sock, addr, port) {
          if (typeof sock.saddr !== 'undefined' || typeof sock.sport !== 'undefined') {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);  // already bound
          }
          sock.saddr = addr;
          sock.sport = port;
          // in order to emulate dgram sockets, we need to launch a listen server when
          // binding on a connection-less socket
          // note: this is only required on the server side
          if (sock.type === 2) {
            // close the existing server if it exists
            if (sock.server) {
              sock.server.close();
              sock.server = null;
            }
            // swallow error operation not supported error that occurs when binding in the
            // browser where this isn't supported
            try {
              sock.sock_ops.listen(sock, 0);
            } catch (e) {
              if (!(e instanceof FS.ErrnoError)) throw e;
              if (e.errno !== ERRNO_CODES.EOPNOTSUPP) throw e;
            }
          }
        },connect:function (sock, addr, port) {
          if (sock.server) {
            throw new FS.ErrnoError(ERRNO_CODES.EOPNOTSUPP);
          }
  
          // TODO autobind
          // if (!sock.addr && sock.type == 2) {
          // }
  
          // early out if we're already connected / in the middle of connecting
          if (typeof sock.daddr !== 'undefined' && typeof sock.dport !== 'undefined') {
            var dest = SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport);
            if (dest) {
              if (dest.socket.readyState === dest.socket.CONNECTING) {
                throw new FS.ErrnoError(ERRNO_CODES.EALREADY);
              } else {
                throw new FS.ErrnoError(ERRNO_CODES.EISCONN);
              }
            }
          }
  
          // add the socket to our peer list and set our
          // destination address / port to match
          var peer = SOCKFS.websocket_sock_ops.createPeer(sock, addr, port);
          sock.daddr = peer.addr;
          sock.dport = peer.port;
  
          // always "fail" in non-blocking mode
          throw new FS.ErrnoError(ERRNO_CODES.EINPROGRESS);
        },listen:function (sock, backlog) {
          if (!ENVIRONMENT_IS_NODE) {
            throw new FS.ErrnoError(ERRNO_CODES.EOPNOTSUPP);
          }
          if (sock.server) {
             throw new FS.ErrnoError(ERRNO_CODES.EINVAL);  // already listening
          }
          var WebSocketServer = require('ws').Server;
          var host = sock.saddr;
          sock.server = new WebSocketServer({
            host: host,
            port: sock.sport
            // TODO support backlog
          });
          Module['websocket'].emit('listen', sock.stream.fd); // Send Event with listen fd.
  
          sock.server.on('connection', function(ws) {
            if (sock.type === 1) {
              var newsock = SOCKFS.createSocket(sock.family, sock.type, sock.protocol);
  
              // create a peer on the new socket
              var peer = SOCKFS.websocket_sock_ops.createPeer(newsock, ws);
              newsock.daddr = peer.addr;
              newsock.dport = peer.port;
  
              // push to queue for accept to pick up
              sock.pending.push(newsock);
              Module['websocket'].emit('connection', newsock.stream.fd);
            } else {
              // create a peer on the listen socket so calling sendto
              // with the listen socket and an address will resolve
              // to the correct client
              SOCKFS.websocket_sock_ops.createPeer(sock, ws);
              Module['websocket'].emit('connection', sock.stream.fd);
            }
          });
          sock.server.on('closed', function() {
            Module['websocket'].emit('close', sock.stream.fd);
            sock.server = null;
          });
          sock.server.on('error', function(error) {
            // Although the ws library may pass errors that may be more descriptive than
            // ECONNREFUSED they are not necessarily the expected error code e.g. 
            // ENOTFOUND on getaddrinfo seems to be node.js specific, so using EHOSTUNREACH
            // is still probably the most useful thing to do. This error shouldn't
            // occur in a well written app as errors should get trapped in the compiled
            // app's own getaddrinfo call.
            sock.error = ERRNO_CODES.EHOSTUNREACH; // Used in getsockopt for SOL_SOCKET/SO_ERROR test.
            Module['websocket'].emit('error', [sock.stream.fd, sock.error, 'EHOSTUNREACH: Host is unreachable']);
            // don't throw
          });
        },accept:function (listensock) {
          if (!listensock.server) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
          var newsock = listensock.pending.shift();
          newsock.stream.flags = listensock.stream.flags;
          return newsock;
        },getname:function (sock, peer) {
          var addr, port;
          if (peer) {
            if (sock.daddr === undefined || sock.dport === undefined) {
              throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN);
            }
            addr = sock.daddr;
            port = sock.dport;
          } else {
            // TODO saddr and sport will be set for bind()'d UDP sockets, but what
            // should we be returning for TCP sockets that've been connect()'d?
            addr = sock.saddr || 0;
            port = sock.sport || 0;
          }
          return { addr: addr, port: port };
        },sendmsg:function (sock, buffer, offset, length, addr, port) {
          if (sock.type === 2) {
            // connection-less sockets will honor the message address,
            // and otherwise fall back to the bound destination address
            if (addr === undefined || port === undefined) {
              addr = sock.daddr;
              port = sock.dport;
            }
            // if there was no address to fall back to, error out
            if (addr === undefined || port === undefined) {
              throw new FS.ErrnoError(ERRNO_CODES.EDESTADDRREQ);
            }
          } else {
            // connection-based sockets will only use the bound
            addr = sock.daddr;
            port = sock.dport;
          }
  
          // find the peer for the destination address
          var dest = SOCKFS.websocket_sock_ops.getPeer(sock, addr, port);
  
          // early out if not connected with a connection-based socket
          if (sock.type === 1) {
            if (!dest || dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
              throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN);
            } else if (dest.socket.readyState === dest.socket.CONNECTING) {
              throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
            }
          }
  
          // create a copy of the incoming data to send, as the WebSocket API
          // doesn't work entirely with an ArrayBufferView, it'll just send
          // the entire underlying buffer
          if (ArrayBuffer.isView(buffer)) {
            offset += buffer.byteOffset;
            buffer = buffer.buffer;
          }
  
          var data;
            data = buffer.slice(offset, offset + length);
  
          // if we're emulating a connection-less dgram socket and don't have
          // a cached connection, queue the buffer to send upon connect and
          // lie, saying the data was sent now.
          if (sock.type === 2) {
            if (!dest || dest.socket.readyState !== dest.socket.OPEN) {
              // if we're not connected, open a new connection
              if (!dest || dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
                dest = SOCKFS.websocket_sock_ops.createPeer(sock, addr, port);
              }
              dest.dgram_send_queue.push(data);
              return length;
            }
          }
  
          try {
            // send the actual data
            dest.socket.send(data);
            return length;
          } catch (e) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
        },recvmsg:function (sock, length) {
          // http://pubs.opengroup.org/onlinepubs/7908799/xns/recvmsg.html
          if (sock.type === 1 && sock.server) {
            // tcp servers should not be recv()'ing on the listen socket
            throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN);
          }
  
          var queued = sock.recv_queue.shift();
          if (!queued) {
            if (sock.type === 1) {
              var dest = SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport);
  
              if (!dest) {
                // if we have a destination address but are not connected, error out
                throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN);
              }
              else if (dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
                // return null if the socket has closed
                return null;
              }
              else {
                // else, our socket is in a valid state but truly has nothing available
                throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
              }
            } else {
              throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
            }
          }
  
          // queued.data will be an ArrayBuffer if it's unadulterated, but if it's
          // requeued TCP data it'll be an ArrayBufferView
          var queuedLength = queued.data.byteLength || queued.data.length;
          var queuedOffset = queued.data.byteOffset || 0;
          var queuedBuffer = queued.data.buffer || queued.data;
          var bytesRead = Math.min(length, queuedLength);
          var res = {
            buffer: new Uint8Array(queuedBuffer, queuedOffset, bytesRead),
            addr: queued.addr,
            port: queued.port
          };
  
  
          // push back any unread data for TCP connections
          if (sock.type === 1 && bytesRead < queuedLength) {
            var bytesRemaining = queuedLength - bytesRead;
            queued.data = new Uint8Array(queuedBuffer, queuedOffset + bytesRead, bytesRemaining);
            sock.recv_queue.unshift(queued);
          }
  
          return res;
        }}};
  
  
  function __inet_pton4_raw(str) {
      var b = str.split('.');
      for (var i = 0; i < 4; i++) {
        var tmp = Number(b[i]);
        if (isNaN(tmp)) return null;
        b[i] = tmp;
      }
      return (b[0] | (b[1] << 8) | (b[2] << 16) | (b[3] << 24)) >>> 0;
    }
  
  function __inet_pton6_raw(str) {
      var words;
      var w, offset, z, i;
      /* http://home.deds.nl/~aeron/regex/ */
      var valid6regx = /^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i
      var parts = [];
      if (!valid6regx.test(str)) {
        return null;
      }
      if (str === "::") {
        return [0, 0, 0, 0, 0, 0, 0, 0];
      }
      // Z placeholder to keep track of zeros when splitting the string on ":"
      if (str.indexOf("::") === 0) {
        str = str.replace("::", "Z:"); // leading zeros case
      } else {
        str = str.replace("::", ":Z:");
      }
  
      if (str.indexOf(".") > 0) {
        // parse IPv4 embedded stress
        str = str.replace(new RegExp('[.]', 'g'), ":");
        words = str.split(":");
        words[words.length-4] = parseInt(words[words.length-4]) + parseInt(words[words.length-3])*256;
        words[words.length-3] = parseInt(words[words.length-2]) + parseInt(words[words.length-1])*256;
        words = words.slice(0, words.length-2);
      } else {
        words = str.split(":");
      }
  
      offset = 0; z = 0;
      for (w=0; w < words.length; w++) {
        if (typeof words[w] === 'string') {
          if (words[w] === 'Z') {
            // compressed zeros - write appropriate number of zero words
            for (z = 0; z < (8 - words.length+1); z++) {
              parts[w+z] = 0;
            }
            offset = z-1;
          } else {
            // parse hex to field to 16-bit value and write it in network byte-order
            parts[w+offset] = _htons(parseInt(words[w],16));
          }
        } else {
          // parsed IPv4 words
          parts[w+offset] = words[w];
        }
      }
      return [
        (parts[1] << 16) | parts[0],
        (parts[3] << 16) | parts[2],
        (parts[5] << 16) | parts[4],
        (parts[7] << 16) | parts[6]
      ];
    }var DNS={address_map:{id:1,addrs:{},names:{}},lookup_name:function (name) {
        // If the name is already a valid ipv4 / ipv6 address, don't generate a fake one.
        var res = __inet_pton4_raw(name);
        if (res !== null) {
          return name;
        }
        res = __inet_pton6_raw(name);
        if (res !== null) {
          return name;
        }
  
        // See if this name is already mapped.
        var addr;
  
        if (DNS.address_map.addrs[name]) {
          addr = DNS.address_map.addrs[name];
        } else {
          var id = DNS.address_map.id++;
          assert(id < 65535, 'exceeded max address mappings of 65535');
  
          addr = '172.29.' + (id & 0xff) + '.' + (id & 0xff00);
  
          DNS.address_map.names[addr] = name;
          DNS.address_map.addrs[name] = addr;
        }
  
        return addr;
      },lookup_addr:function (addr) {
        if (DNS.address_map.names[addr]) {
          return DNS.address_map.names[addr];
        }
  
        return null;
      }};
  
  
  var Sockets={BUFFER_SIZE:10240,MAX_BUFFER_SIZE:10485760,nextFd:1,fds:{},nextport:1,maxport:65535,peer:null,connections:{},portmap:{},localAddr:4261412874,addrPool:[33554442,50331658,67108874,83886090,100663306,117440522,134217738,150994954,167772170,184549386,201326602,218103818,234881034]};
  
  function __inet_ntop4_raw(addr) {
      return (addr & 0xff) + '.' + ((addr >> 8) & 0xff) + '.' + ((addr >> 16) & 0xff) + '.' + ((addr >> 24) & 0xff)
    }
  
  function __inet_ntop6_raw(ints) {
      //  ref:  http://www.ietf.org/rfc/rfc2373.txt - section 2.5.4
      //  Format for IPv4 compatible and mapped  128-bit IPv6 Addresses
      //  128-bits are split into eight 16-bit words
      //  stored in network byte order (big-endian)
      //  |                80 bits               | 16 |      32 bits        |
      //  +-----------------------------------------------------------------+
      //  |               10 bytes               |  2 |      4 bytes        |
      //  +--------------------------------------+--------------------------+
      //  +               5 words                |  1 |      2 words        |
      //  +--------------------------------------+--------------------------+
      //  |0000..............................0000|0000|    IPv4 ADDRESS     | (compatible)
      //  +--------------------------------------+----+---------------------+
      //  |0000..............................0000|FFFF|    IPv4 ADDRESS     | (mapped)
      //  +--------------------------------------+----+---------------------+
      var str = "";
      var word = 0;
      var longest = 0;
      var lastzero = 0;
      var zstart = 0;
      var len = 0;
      var i = 0;
      var parts = [
        ints[0] & 0xffff,
        (ints[0] >> 16),
        ints[1] & 0xffff,
        (ints[1] >> 16),
        ints[2] & 0xffff,
        (ints[2] >> 16),
        ints[3] & 0xffff,
        (ints[3] >> 16)
      ];
  
      // Handle IPv4-compatible, IPv4-mapped, loopback and any/unspecified addresses
  
      var hasipv4 = true;
      var v4part = "";
      // check if the 10 high-order bytes are all zeros (first 5 words)
      for (i = 0; i < 5; i++) {
        if (parts[i] !== 0) { hasipv4 = false; break; }
      }
  
      if (hasipv4) {
        // low-order 32-bits store an IPv4 address (bytes 13 to 16) (last 2 words)
        v4part = __inet_ntop4_raw(parts[6] | (parts[7] << 16));
        // IPv4-mapped IPv6 address if 16-bit value (bytes 11 and 12) == 0xFFFF (6th word)
        if (parts[5] === -1) {
          str = "::ffff:";
          str += v4part;
          return str;
        }
        // IPv4-compatible IPv6 address if 16-bit value (bytes 11 and 12) == 0x0000 (6th word)
        if (parts[5] === 0) {
          str = "::";
          //special case IPv6 addresses
          if(v4part === "0.0.0.0") v4part = ""; // any/unspecified address
          if(v4part === "0.0.0.1") v4part = "1";// loopback address
          str += v4part;
          return str;
        }
      }
  
      // Handle all other IPv6 addresses
  
      // first run to find the longest contiguous zero words
      for (word = 0; word < 8; word++) {
        if (parts[word] === 0) {
          if (word - lastzero > 1) {
            len = 0;
          }
          lastzero = word;
          len++;
        }
        if (len > longest) {
          longest = len;
          zstart = word - longest + 1;
        }
      }
  
      for (word = 0; word < 8; word++) {
        if (longest > 1) {
          // compress contiguous zeros - to produce "::"
          if (parts[word] === 0 && word >= zstart && word < (zstart + longest) ) {
            if (word === zstart) {
              str += ":";
              if (zstart === 0) str += ":"; //leading zeros case
            }
            continue;
          }
        }
        // converts 16-bit words from big-endian to little-endian before converting to hex string
        str += Number(_ntohs(parts[word] & 0xffff)).toString(16);
        str += word < 7 ? ":" : "";
      }
      return str;
    }function __read_sockaddr(sa, salen) {
      // family / port offsets are common to both sockaddr_in and sockaddr_in6
      var family = HEAP16[((sa)>>1)];
      var port = _ntohs(HEAP16[(((sa)+(2))>>1)]);
      var addr;
  
      switch (family) {
        case 2:
          if (salen !== 16) {
            return { errno: 22 };
          }
          addr = HEAP32[(((sa)+(4))>>2)];
          addr = __inet_ntop4_raw(addr);
          break;
        case 10:
          if (salen !== 28) {
            return { errno: 22 };
          }
          addr = [
            HEAP32[(((sa)+(8))>>2)],
            HEAP32[(((sa)+(12))>>2)],
            HEAP32[(((sa)+(16))>>2)],
            HEAP32[(((sa)+(20))>>2)]
          ];
          addr = __inet_ntop6_raw(addr);
          break;
        default:
          return { errno: 97 };
      }
  
      return { family: family, addr: addr, port: port };
    }
  
  function __write_sockaddr(sa, family, addr, port) {
      switch (family) {
        case 2:
          addr = __inet_pton4_raw(addr);
          HEAP16[((sa)>>1)]=family;
          HEAP32[(((sa)+(4))>>2)]=addr;
          HEAP16[(((sa)+(2))>>1)]=_htons(port);
          break;
        case 10:
          addr = __inet_pton6_raw(addr);
          HEAP32[((sa)>>2)]=family;
          HEAP32[(((sa)+(8))>>2)]=addr[0];
          HEAP32[(((sa)+(12))>>2)]=addr[1];
          HEAP32[(((sa)+(16))>>2)]=addr[2];
          HEAP32[(((sa)+(20))>>2)]=addr[3];
          HEAP16[(((sa)+(2))>>1)]=_htons(port);
          HEAP32[(((sa)+(4))>>2)]=0;
          HEAP32[(((sa)+(24))>>2)]=0;
          break;
        default:
          return { errno: 97 };
      }
      // kind of lame, but let's match _read_sockaddr's interface
      return {};
    }function ___syscall102(which, varargs) {SYSCALLS.varargs = varargs;
  try {
   // socketcall
      var call = SYSCALLS.get(), socketvararg = SYSCALLS.get();
      // socketcalls pass the rest of the arguments in a struct
      SYSCALLS.varargs = socketvararg;
      switch (call) {
        case 1: { // socket
          var domain = SYSCALLS.get(), type = SYSCALLS.get(), protocol = SYSCALLS.get();
          var sock = SOCKFS.createSocket(domain, type, protocol);
          assert(sock.stream.fd < 64); // XXX ? select() assumes socket fd values are in 0..63
          return sock.stream.fd;
        }
        case 2: { // bind
          var sock = SYSCALLS.getSocketFromFD(), info = SYSCALLS.getSocketAddress();
          sock.sock_ops.bind(sock, info.addr, info.port);
          return 0;
        }
        case 3: { // connect
          var sock = SYSCALLS.getSocketFromFD(), info = SYSCALLS.getSocketAddress();
          sock.sock_ops.connect(sock, info.addr, info.port);
          return 0;
        }
        case 4: { // listen
          var sock = SYSCALLS.getSocketFromFD(), backlog = SYSCALLS.get();
          sock.sock_ops.listen(sock, backlog);
          return 0;
        }
        case 5: { // accept
          var sock = SYSCALLS.getSocketFromFD(), addr = SYSCALLS.get(), addrlen = SYSCALLS.get();
          var newsock = sock.sock_ops.accept(sock);
          if (addr) {
            var res = __write_sockaddr(addr, newsock.family, DNS.lookup_name(newsock.daddr), newsock.dport);
            assert(!res.errno);
          }
          return newsock.stream.fd;
        }
        case 6: { // getsockname
          var sock = SYSCALLS.getSocketFromFD(), addr = SYSCALLS.get(), addrlen = SYSCALLS.get();
          // TODO: sock.saddr should never be undefined, see TODO in websocket_sock_ops.getname
          var res = __write_sockaddr(addr, sock.family, DNS.lookup_name(sock.saddr || '0.0.0.0'), sock.sport);
          assert(!res.errno);
          return 0;
        }
        case 7: { // getpeername
          var sock = SYSCALLS.getSocketFromFD(), addr = SYSCALLS.get(), addrlen = SYSCALLS.get();
          if (!sock.daddr) {
            return -ERRNO_CODES.ENOTCONN; // The socket is not connected.
          }
          var res = __write_sockaddr(addr, sock.family, DNS.lookup_name(sock.daddr), sock.dport);
          assert(!res.errno);
          return 0;
        }
        case 11: { // sendto
          var sock = SYSCALLS.getSocketFromFD(), message = SYSCALLS.get(), length = SYSCALLS.get(), flags = SYSCALLS.get(), dest = SYSCALLS.getSocketAddress(true);
          if (!dest) {
            // send, no address provided
            return FS.write(sock.stream, HEAP8,message, length);
          } else {
            // sendto an address
            return sock.sock_ops.sendmsg(sock, HEAP8,message, length, dest.addr, dest.port);
          }
        }
        case 12: { // recvfrom
          var sock = SYSCALLS.getSocketFromFD(), buf = SYSCALLS.get(), len = SYSCALLS.get(), flags = SYSCALLS.get(), addr = SYSCALLS.get(), addrlen = SYSCALLS.get();
          var msg = sock.sock_ops.recvmsg(sock, len);
          if (!msg) return 0; // socket is closed
          if (addr) {
            var res = __write_sockaddr(addr, sock.family, DNS.lookup_name(msg.addr), msg.port);
            assert(!res.errno);
          }
          HEAPU8.set(msg.buffer, buf);
          return msg.buffer.byteLength;
        }
        case 14: { // setsockopt
          return -ERRNO_CODES.ENOPROTOOPT; // The option is unknown at the level indicated.
        }
        case 15: { // getsockopt
          var sock = SYSCALLS.getSocketFromFD(), level = SYSCALLS.get(), optname = SYSCALLS.get(), optval = SYSCALLS.get(), optlen = SYSCALLS.get();
          // Minimal getsockopt aimed at resolving https://github.com/emscripten-core/emscripten/issues/2211
          // so only supports SOL_SOCKET with SO_ERROR.
          if (level === 1) {
            if (optname === 4) {
              HEAP32[((optval)>>2)]=sock.error;
              HEAP32[((optlen)>>2)]=4;
              sock.error = null; // Clear the error (The SO_ERROR option obtains and then clears this field).
              return 0;
            }
          }
          return -ERRNO_CODES.ENOPROTOOPT; // The option is unknown at the level indicated.
        }
        case 16: { // sendmsg
          var sock = SYSCALLS.getSocketFromFD(), message = SYSCALLS.get(), flags = SYSCALLS.get();
          var iov = HEAP32[(((message)+(8))>>2)];
          var num = HEAP32[(((message)+(12))>>2)];
          // read the address and port to send to
          var addr, port;
          var name = HEAP32[((message)>>2)];
          var namelen = HEAP32[(((message)+(4))>>2)];
          if (name) {
            var info = __read_sockaddr(name, namelen);
            if (info.errno) return -info.errno;
            port = info.port;
            addr = DNS.lookup_addr(info.addr) || info.addr;
          }
          // concatenate scatter-gather arrays into one message buffer
          var total = 0;
          for (var i = 0; i < num; i++) {
            total += HEAP32[(((iov)+((8 * i) + 4))>>2)];
          }
          var view = new Uint8Array(total);
          var offset = 0;
          for (var i = 0; i < num; i++) {
            var iovbase = HEAP32[(((iov)+((8 * i) + 0))>>2)];
            var iovlen = HEAP32[(((iov)+((8 * i) + 4))>>2)];
            for (var j = 0; j < iovlen; j++) {  
              view[offset++] = HEAP8[(((iovbase)+(j))>>0)];
            }
          }
          // write the buffer
          return sock.sock_ops.sendmsg(sock, view, 0, total, addr, port);
        }
        case 17: { // recvmsg
          var sock = SYSCALLS.getSocketFromFD(), message = SYSCALLS.get(), flags = SYSCALLS.get();
          var iov = HEAP32[(((message)+(8))>>2)];
          var num = HEAP32[(((message)+(12))>>2)];
          // get the total amount of data we can read across all arrays
          var total = 0;
          for (var i = 0; i < num; i++) {
            total += HEAP32[(((iov)+((8 * i) + 4))>>2)];
          }
          // try to read total data
          var msg = sock.sock_ops.recvmsg(sock, total);
          if (!msg) return 0; // socket is closed
  
          // TODO honor flags:
          // MSG_OOB
          // Requests out-of-band data. The significance and semantics of out-of-band data are protocol-specific.
          // MSG_PEEK
          // Peeks at the incoming message.
          // MSG_WAITALL
          // Requests that the function block until the full amount of data requested can be returned. The function may return a smaller amount of data if a signal is caught, if the connection is terminated, if MSG_PEEK was specified, or if an error is pending for the socket.
  
          // write the source address out
          var name = HEAP32[((message)>>2)];
          if (name) {
            var res = __write_sockaddr(name, sock.family, DNS.lookup_name(msg.addr), msg.port);
            assert(!res.errno);
          }
          // write the buffer out to the scatter-gather arrays
          var bytesRead = 0;
          var bytesRemaining = msg.buffer.byteLength;
          for (var i = 0; bytesRemaining > 0 && i < num; i++) {
            var iovbase = HEAP32[(((iov)+((8 * i) + 0))>>2)];
            var iovlen = HEAP32[(((iov)+((8 * i) + 4))>>2)];
            if (!iovlen) {
              continue;
            }
            var length = Math.min(iovlen, bytesRemaining);
            var buf = msg.buffer.subarray(bytesRead, bytesRead + length);
            HEAPU8.set(buf, iovbase + bytesRead);
            bytesRead += length;
            bytesRemaining -= length;
          }
  
          // TODO set msghdr.msg_flags
          // MSG_EOR
          // End of record was received (if supported by the protocol).
          // MSG_OOB
          // Out-of-band data was received.
          // MSG_TRUNC
          // Normal data was truncated.
          // MSG_CTRUNC
  
          return bytesRead;
        }
        default: abort('unsupported socketcall syscall ' + call);
      }
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }

  function ___syscall12(which, varargs) {SYSCALLS.varargs = varargs;
  try {
   // chdir
      var path = SYSCALLS.getStr();
      FS.chdir(path);
      return 0;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }

  function ___syscall122(which, varargs) {SYSCALLS.varargs = varargs;
  try {
   // uname
      var buf = SYSCALLS.get();
      if (!buf) return -ERRNO_CODES.EFAULT
      var layout = {"sysname":0,"nodename":65,"domainname":325,"machine":260,"version":195,"release":130,"__size__":390};
      var copyString = function(element, value) {
        var offset = layout[element];
        writeAsciiToMemory(value, buf + offset);
      };
      copyString('sysname', 'Emscripten');
      copyString('nodename', 'emscripten');
      copyString('release', '1.0');
      copyString('version', '#1');
      copyString('machine', 'x86-JS');
      return 0;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }

  function ___syscall140(which, varargs) {SYSCALLS.varargs = varargs;
  try {
   // llseek
      var stream = SYSCALLS.getStreamFromFD(), offset_high = SYSCALLS.get(), offset_low = SYSCALLS.get(), result = SYSCALLS.get(), whence = SYSCALLS.get();
      // NOTE: offset_high is unused - Emscripten's off_t is 32-bit
      var offset = offset_low;
      FS.llseek(stream, offset, whence);
      HEAP32[((result)>>2)]=stream.position;
      if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null; // reset readdir state
      return 0;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }

  function ___syscall145(which, varargs) {SYSCALLS.varargs = varargs;
  try {
   // readv
      var stream = SYSCALLS.getStreamFromFD(), iov = SYSCALLS.get(), iovcnt = SYSCALLS.get();
      return SYSCALLS.doReadv(stream, iov, iovcnt);
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }

  function ___syscall146(which, varargs) {SYSCALLS.varargs = varargs;
  try {
   // writev
      var stream = SYSCALLS.getStreamFromFD(), iov = SYSCALLS.get(), iovcnt = SYSCALLS.get();
      return SYSCALLS.doWritev(stream, iov, iovcnt);
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }

  function ___syscall15(which, varargs) {SYSCALLS.varargs = varargs;
  try {
   // chmod
      var path = SYSCALLS.getStr(), mode = SYSCALLS.get();
      FS.chmod(path, mode);
      return 0;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }

  function ___syscall183(which, varargs) {SYSCALLS.varargs = varargs;
  try {
   // getcwd
      var buf = SYSCALLS.get(), size = SYSCALLS.get();
      if (size === 0) return -ERRNO_CODES.EINVAL;
      var cwd = FS.cwd();
      var cwdLengthInBytes = lengthBytesUTF8(cwd);
      if (size < cwdLengthInBytes + 1) return -ERRNO_CODES.ERANGE;
      stringToUTF8(cwd, buf, size);
      return buf;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }

  function ___syscall195(which, varargs) {SYSCALLS.varargs = varargs;
  try {
   // SYS_stat64
      var path = SYSCALLS.getStr(), buf = SYSCALLS.get();
      return SYSCALLS.doStat(FS.stat, path, buf);
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }

  function ___syscall220(which, varargs) {SYSCALLS.varargs = varargs;
  try {
   // SYS_getdents64
      var stream = SYSCALLS.getStreamFromFD(), dirp = SYSCALLS.get(), count = SYSCALLS.get();
      if (!stream.getdents) {
        stream.getdents = FS.readdir(stream.path);
      }
      var pos = 0;
      while (stream.getdents.length > 0 && pos + 268 <= count) {
        var id;
        var type;
        var name = stream.getdents.pop();
        if (name[0] === '.') {
          id = 1;
          type = 4; // DT_DIR
        } else {
          var child = FS.lookupNode(stream.node, name);
          id = child.id;
          type = FS.isChrdev(child.mode) ? 2 :  // DT_CHR, character device.
                 FS.isDir(child.mode) ? 4 :     // DT_DIR, directory.
                 FS.isLink(child.mode) ? 10 :   // DT_LNK, symbolic link.
                 8;                             // DT_REG, regular file.
        }
        HEAP32[((dirp + pos)>>2)]=id;
        HEAP32[(((dirp + pos)+(4))>>2)]=stream.position;
        HEAP16[(((dirp + pos)+(8))>>1)]=268;
        HEAP8[(((dirp + pos)+(10))>>0)]=type;
        stringToUTF8(name, dirp + pos + 11, 256);
        pos += 268;
      }
      return pos;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }

  function ___syscall221(which, varargs) {SYSCALLS.varargs = varargs;
  try {
   // fcntl64
      var stream = SYSCALLS.getStreamFromFD(), cmd = SYSCALLS.get();
      switch (cmd) {
        case 0: {
          var arg = SYSCALLS.get();
          if (arg < 0) {
            return -ERRNO_CODES.EINVAL;
          }
          var newStream;
          newStream = FS.open(stream.path, stream.flags, 0, arg);
          return newStream.fd;
        }
        case 1:
        case 2:
          return 0;  // FD_CLOEXEC makes no sense for a single process.
        case 3:
          return stream.flags;
        case 4: {
          var arg = SYSCALLS.get();
          stream.flags |= arg;
          return 0;
        }
        case 12:
        /* case 12: Currently in musl F_GETLK64 has same value as F_GETLK, so omitted to avoid duplicate case blocks. If that changes, uncomment this */ {
          
          var arg = SYSCALLS.get();
          var offset = 0;
          // We're always unlocked.
          HEAP16[(((arg)+(offset))>>1)]=2;
          return 0;
        }
        case 13:
        case 14:
        /* case 13: Currently in musl F_SETLK64 has same value as F_SETLK, so omitted to avoid duplicate case blocks. If that changes, uncomment this */
        /* case 14: Currently in musl F_SETLKW64 has same value as F_SETLKW, so omitted to avoid duplicate case blocks. If that changes, uncomment this */
          
          
          return 0; // Pretend that the locking is successful.
        case 16:
        case 8:
          return -ERRNO_CODES.EINVAL; // These are for sockets. We don't have them fully implemented yet.
        case 9:
          // musl trusts getown return values, due to a bug where they must be, as they overlap with errors. just return -1 here, so fnctl() returns that, and we set errno ourselves.
          ___setErrNo(ERRNO_CODES.EINVAL);
          return -1;
        default: {
          return -ERRNO_CODES.EINVAL;
        }
      }
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }

  function ___syscall3(which, varargs) {SYSCALLS.varargs = varargs;
  try {
   // read
      var stream = SYSCALLS.getStreamFromFD(), buf = SYSCALLS.get(), count = SYSCALLS.get();
      return FS.read(stream, HEAP8,buf, count);
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }

  function ___syscall33(which, varargs) {SYSCALLS.varargs = varargs;
  try {
   // access
      var path = SYSCALLS.getStr(), amode = SYSCALLS.get();
      return SYSCALLS.doAccess(path, amode);
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }

  function ___syscall38(which, varargs) {SYSCALLS.varargs = varargs;
  try {
   // rename
      var old_path = SYSCALLS.getStr(), new_path = SYSCALLS.getStr();
      FS.rename(old_path, new_path);
      return 0;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }

  function ___syscall39(which, varargs) {SYSCALLS.varargs = varargs;
  try {
   // mkdir
      var path = SYSCALLS.getStr(), mode = SYSCALLS.get();
      return SYSCALLS.doMkdir(path, mode);
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }

  function ___syscall4(which, varargs) {SYSCALLS.varargs = varargs;
  try {
   // write
      var stream = SYSCALLS.getStreamFromFD(), buf = SYSCALLS.get(), count = SYSCALLS.get();
      return FS.write(stream, HEAP8,buf, count);
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }

  function ___syscall40(which, varargs) {SYSCALLS.varargs = varargs;
  try {
   // rmdir
      var path = SYSCALLS.getStr();
      FS.rmdir(path);
      return 0;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }

  function ___syscall5(which, varargs) {SYSCALLS.varargs = varargs;
  try {
   // open
      var pathname = SYSCALLS.getStr(), flags = SYSCALLS.get(), mode = SYSCALLS.get() // optional TODO
      var stream = FS.open(pathname, flags, mode);
      return stream.fd;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }

  function ___syscall54(which, varargs) {SYSCALLS.varargs = varargs;
  try {
   // ioctl
      var stream = SYSCALLS.getStreamFromFD(), op = SYSCALLS.get();
      switch (op) {
        case 21509:
        case 21505: {
          if (!stream.tty) return -ERRNO_CODES.ENOTTY;
          return 0;
        }
        case 21510:
        case 21511:
        case 21512:
        case 21506:
        case 21507:
        case 21508: {
          if (!stream.tty) return -ERRNO_CODES.ENOTTY;
          return 0; // no-op, not actually adjusting terminal settings
        }
        case 21519: {
          if (!stream.tty) return -ERRNO_CODES.ENOTTY;
          var argp = SYSCALLS.get();
          HEAP32[((argp)>>2)]=0;
          return 0;
        }
        case 21520: {
          if (!stream.tty) return -ERRNO_CODES.ENOTTY;
          return -ERRNO_CODES.EINVAL; // not supported
        }
        case 21531: {
          var argp = SYSCALLS.get();
          return FS.ioctl(stream, op, argp);
        }
        case 21523: {
          // TODO: in theory we should write to the winsize struct that gets
          // passed in, but for now musl doesn't read anything on it
          if (!stream.tty) return -ERRNO_CODES.ENOTTY;
          return 0;
        }
        case 21524: {
          // TODO: technically, this ioctl call should change the window size.
          // but, since emscripten doesn't have any concept of a terminal window
          // yet, we'll just silently throw it away as we do TIOCGWINSZ
          if (!stream.tty) return -ERRNO_CODES.ENOTTY;
          return 0;
        }
        default: abort('bad ioctl syscall ' + op);
      }
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }

  function ___syscall6(which, varargs) {SYSCALLS.varargs = varargs;
  try {
   // close
      var stream = SYSCALLS.getStreamFromFD();
      FS.close(stream);
      return 0;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }

  function ___unlock() {}

  function _abort() {
      Module['abort']();
    }

  
  
  
  
  function _emscripten_set_main_loop_timing(mode, value) {
      Browser.mainLoop.timingMode = mode;
      Browser.mainLoop.timingValue = value;
  
      if (!Browser.mainLoop.func) {
        console.error('emscripten_set_main_loop_timing: Cannot set timing mode for main loop since a main loop does not exist! Call emscripten_set_main_loop first to set one up.');
        return 1; // Return non-zero on failure, can't set timing mode when there is no main loop.
      }
  
      if (mode == 0 /*EM_TIMING_SETTIMEOUT*/) {
        Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_setTimeout() {
          var timeUntilNextTick = Math.max(0, Browser.mainLoop.tickStartTime + value - _emscripten_get_now())|0;
          setTimeout(Browser.mainLoop.runner, timeUntilNextTick); // doing this each time means that on exception, we stop
        };
        Browser.mainLoop.method = 'timeout';
      } else if (mode == 1 /*EM_TIMING_RAF*/) {
        Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_rAF() {
          Browser.requestAnimationFrame(Browser.mainLoop.runner);
        };
        Browser.mainLoop.method = 'rAF';
      } else if (mode == 2 /*EM_TIMING_SETIMMEDIATE*/) {
        if (typeof setImmediate === 'undefined') {
          // Emulate setImmediate. (note: not a complete polyfill, we don't emulate clearImmediate() to keep code size to minimum, since not needed)
          var setImmediates = [];
          var emscriptenMainLoopMessageId = 'setimmediate';
          var Browser_setImmediate_messageHandler = function(event) {
            // When called in current thread or Worker, the main loop ID is structured slightly different to accommodate for --proxy-to-worker runtime listening to Worker events,
            // so check for both cases.
            if (event.data === emscriptenMainLoopMessageId || event.data.target === emscriptenMainLoopMessageId) {
              event.stopPropagation();
              setImmediates.shift()();
            }
          }
          addEventListener("message", Browser_setImmediate_messageHandler, true);
          setImmediate = function Browser_emulated_setImmediate(func) {
            setImmediates.push(func);
            if (ENVIRONMENT_IS_WORKER) {
              if (Module['setImmediates'] === undefined) Module['setImmediates'] = [];
              Module['setImmediates'].push(func);
              postMessage({target: emscriptenMainLoopMessageId}); // In --proxy-to-worker, route the message via proxyClient.js
            } else postMessage(emscriptenMainLoopMessageId, "*"); // On the main thread, can just send the message to itself.
          }
        }
        Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_setImmediate() {
          setImmediate(Browser.mainLoop.runner);
        };
        Browser.mainLoop.method = 'immediate';
      }
      return 0;
    }
  
  function _emscripten_get_now() { abort() }function _emscripten_set_main_loop(func, fps, simulateInfiniteLoop, arg, noSetTiming) {
      Module['noExitRuntime'] = true;
  
      assert(!Browser.mainLoop.func, 'emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters.');
  
      Browser.mainLoop.func = func;
      Browser.mainLoop.arg = arg;
  
      var browserIterationFunc;
      if (typeof arg !== 'undefined') {
        browserIterationFunc = function() {
          Module['dynCall_vi'](func, arg);
        };
      } else {
        browserIterationFunc = function() {
          Module['dynCall_v'](func);
        };
      }
  
      var thisMainLoopId = Browser.mainLoop.currentlyRunningMainloop;
  
      Browser.mainLoop.runner = function Browser_mainLoop_runner() {
        if (ABORT) return;
        if (Browser.mainLoop.queue.length > 0) {
          var start = Date.now();
          var blocker = Browser.mainLoop.queue.shift();
          blocker.func(blocker.arg);
          if (Browser.mainLoop.remainingBlockers) {
            var remaining = Browser.mainLoop.remainingBlockers;
            var next = remaining%1 == 0 ? remaining-1 : Math.floor(remaining);
            if (blocker.counted) {
              Browser.mainLoop.remainingBlockers = next;
            } else {
              // not counted, but move the progress along a tiny bit
              next = next + 0.5; // do not steal all the next one's progress
              Browser.mainLoop.remainingBlockers = (8*remaining + next)/9;
            }
          }
          console.log('main loop blocker "' + blocker.name + '" took ' + (Date.now() - start) + ' ms'); //, left: ' + Browser.mainLoop.remainingBlockers);
          Browser.mainLoop.updateStatus();
  
          // catches pause/resume main loop from blocker execution
          if (thisMainLoopId < Browser.mainLoop.currentlyRunningMainloop) return;
  
          setTimeout(Browser.mainLoop.runner, 0);
          return;
        }
  
        // catch pauses from non-main loop sources
        if (thisMainLoopId < Browser.mainLoop.currentlyRunningMainloop) return;
  
        // Implement very basic swap interval control
        Browser.mainLoop.currentFrameNumber = Browser.mainLoop.currentFrameNumber + 1 | 0;
        if (Browser.mainLoop.timingMode == 1/*EM_TIMING_RAF*/ && Browser.mainLoop.timingValue > 1 && Browser.mainLoop.currentFrameNumber % Browser.mainLoop.timingValue != 0) {
          // Not the scheduled time to render this frame - skip.
          Browser.mainLoop.scheduler();
          return;
        } else if (Browser.mainLoop.timingMode == 0/*EM_TIMING_SETTIMEOUT*/) {
          Browser.mainLoop.tickStartTime = _emscripten_get_now();
        }
  
        // Signal GL rendering layer that processing of a new frame is about to start. This helps it optimize
        // VBO double-buffering and reduce GPU stalls.
  
  
  
        if (Browser.mainLoop.method === 'timeout' && Module.ctx) {
          err('Looks like you are rendering without using requestAnimationFrame for the main loop. You should use 0 for the frame rate in emscripten_set_main_loop in order to use requestAnimationFrame, as that can greatly improve your frame rates!');
          Browser.mainLoop.method = ''; // just warn once per call to set main loop
        }
  
        Browser.mainLoop.runIter(browserIterationFunc);
  
        checkStackCookie();
  
        // catch pauses from the main loop itself
        if (thisMainLoopId < Browser.mainLoop.currentlyRunningMainloop) return;
  
        // Queue new audio data. This is important to be right after the main loop invocation, so that we will immediately be able
        // to queue the newest produced audio samples.
        // TODO: Consider adding pre- and post- rAF callbacks so that GL.newRenderingFrameStarted() and SDL.audio.queueNewAudioData()
        //       do not need to be hardcoded into this function, but can be more generic.
        if (typeof SDL === 'object' && SDL.audio && SDL.audio.queueNewAudioData) SDL.audio.queueNewAudioData();
  
        Browser.mainLoop.scheduler();
      }
  
      if (!noSetTiming) {
        if (fps && fps > 0) _emscripten_set_main_loop_timing(0/*EM_TIMING_SETTIMEOUT*/, 1000.0 / fps);
        else _emscripten_set_main_loop_timing(1/*EM_TIMING_RAF*/, 1); // Do rAF by rendering each frame (no decimating)
  
        Browser.mainLoop.scheduler();
      }
  
      if (simulateInfiniteLoop) {
        throw 'SimulateInfiniteLoop';
      }
    }var Browser={mainLoop:{scheduler:null,method:"",currentlyRunningMainloop:0,func:null,arg:0,timingMode:0,timingValue:0,currentFrameNumber:0,queue:[],pause:function () {
          Browser.mainLoop.scheduler = null;
          Browser.mainLoop.currentlyRunningMainloop++; // Incrementing this signals the previous main loop that it's now become old, and it must return.
        },resume:function () {
          Browser.mainLoop.currentlyRunningMainloop++;
          var timingMode = Browser.mainLoop.timingMode;
          var timingValue = Browser.mainLoop.timingValue;
          var func = Browser.mainLoop.func;
          Browser.mainLoop.func = null;
          _emscripten_set_main_loop(func, 0, false, Browser.mainLoop.arg, true /* do not set timing and call scheduler, we will do it on the next lines */);
          _emscripten_set_main_loop_timing(timingMode, timingValue);
          Browser.mainLoop.scheduler();
        },updateStatus:function () {
          if (Module['setStatus']) {
            var message = Module['statusMessage'] || 'Please wait...';
            var remaining = Browser.mainLoop.remainingBlockers;
            var expected = Browser.mainLoop.expectedBlockers;
            if (remaining) {
              if (remaining < expected) {
                Module['setStatus'](message + ' (' + (expected - remaining) + '/' + expected + ')');
              } else {
                Module['setStatus'](message);
              }
            } else {
              Module['setStatus']('');
            }
          }
        },runIter:function (func) {
          if (ABORT) return;
          if (Module['preMainLoop']) {
            var preRet = Module['preMainLoop']();
            if (preRet === false) {
              return; // |return false| skips a frame
            }
          }
          try {
            func();
          } catch (e) {
            if (e instanceof ExitStatus) {
              return;
            } else {
              if (e && typeof e === 'object' && e.stack) err('exception thrown: ' + [e, e.stack]);
              throw e;
            }
          }
          if (Module['postMainLoop']) Module['postMainLoop']();
        }},isFullscreen:false,pointerLock:false,moduleContextCreatedCallbacks:[],workers:[],init:function () {
        if (!Module["preloadPlugins"]) Module["preloadPlugins"] = []; // needs to exist even in workers
  
        if (Browser.initted) return;
        Browser.initted = true;
  
        try {
          new Blob();
          Browser.hasBlobConstructor = true;
        } catch(e) {
          Browser.hasBlobConstructor = false;
          console.log("warning: no blob constructor, cannot create blobs with mimetypes");
        }
        Browser.BlobBuilder = typeof MozBlobBuilder != "undefined" ? MozBlobBuilder : (typeof WebKitBlobBuilder != "undefined" ? WebKitBlobBuilder : (!Browser.hasBlobConstructor ? console.log("warning: no BlobBuilder") : null));
        Browser.URLObject = typeof window != "undefined" ? (window.URL ? window.URL : window.webkitURL) : undefined;
        if (!Module.noImageDecoding && typeof Browser.URLObject === 'undefined') {
          console.log("warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available.");
          Module.noImageDecoding = true;
        }
  
        // Support for plugins that can process preloaded files. You can add more of these to
        // your app by creating and appending to Module.preloadPlugins.
        //
        // Each plugin is asked if it can handle a file based on the file's name. If it can,
        // it is given the file's raw data. When it is done, it calls a callback with the file's
        // (possibly modified) data. For example, a plugin might decompress a file, or it
        // might create some side data structure for use later (like an Image element, etc.).
  
        var imagePlugin = {};
        imagePlugin['canHandle'] = function imagePlugin_canHandle(name) {
          return !Module.noImageDecoding && /\.(jpg|jpeg|png|bmp)$/i.test(name);
        };
        imagePlugin['handle'] = function imagePlugin_handle(byteArray, name, onload, onerror) {
          var b = null;
          if (Browser.hasBlobConstructor) {
            try {
              b = new Blob([byteArray], { type: Browser.getMimetype(name) });
              if (b.size !== byteArray.length) { // Safari bug #118630
                // Safari's Blob can only take an ArrayBuffer
                b = new Blob([(new Uint8Array(byteArray)).buffer], { type: Browser.getMimetype(name) });
              }
            } catch(e) {
              warnOnce('Blob constructor present but fails: ' + e + '; falling back to blob builder');
            }
          }
          if (!b) {
            var bb = new Browser.BlobBuilder();
            bb.append((new Uint8Array(byteArray)).buffer); // we need to pass a buffer, and must copy the array to get the right data range
            b = bb.getBlob();
          }
          var url = Browser.URLObject.createObjectURL(b);
          assert(typeof url == 'string', 'createObjectURL must return a url as a string');
          var img = new Image();
          img.onload = function img_onload() {
            assert(img.complete, 'Image ' + name + ' could not be decoded');
            var canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            Module["preloadedImages"][name] = canvas;
            Browser.URLObject.revokeObjectURL(url);
            if (onload) onload(byteArray);
          };
          img.onerror = function img_onerror(event) {
            console.log('Image ' + url + ' could not be decoded');
            if (onerror) onerror();
          };
          img.src = url;
        };
        Module['preloadPlugins'].push(imagePlugin);
  
        var audioPlugin = {};
        audioPlugin['canHandle'] = function audioPlugin_canHandle(name) {
          return !Module.noAudioDecoding && name.substr(-4) in { '.ogg': 1, '.wav': 1, '.mp3': 1 };
        };
        audioPlugin['handle'] = function audioPlugin_handle(byteArray, name, onload, onerror) {
          var done = false;
          function finish(audio) {
            if (done) return;
            done = true;
            Module["preloadedAudios"][name] = audio;
            if (onload) onload(byteArray);
          }
          function fail() {
            if (done) return;
            done = true;
            Module["preloadedAudios"][name] = new Audio(); // empty shim
            if (onerror) onerror();
          }
          if (Browser.hasBlobConstructor) {
            try {
              var b = new Blob([byteArray], { type: Browser.getMimetype(name) });
            } catch(e) {
              return fail();
            }
            var url = Browser.URLObject.createObjectURL(b); // XXX we never revoke this!
            assert(typeof url == 'string', 'createObjectURL must return a url as a string');
            var audio = new Audio();
            audio.addEventListener('canplaythrough', function() { finish(audio) }, false); // use addEventListener due to chromium bug 124926
            audio.onerror = function audio_onerror(event) {
              if (done) return;
              console.log('warning: browser could not fully decode audio ' + name + ', trying slower base64 approach');
              function encode64(data) {
                var BASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
                var PAD = '=';
                var ret = '';
                var leftchar = 0;
                var leftbits = 0;
                for (var i = 0; i < data.length; i++) {
                  leftchar = (leftchar << 8) | data[i];
                  leftbits += 8;
                  while (leftbits >= 6) {
                    var curr = (leftchar >> (leftbits-6)) & 0x3f;
                    leftbits -= 6;
                    ret += BASE[curr];
                  }
                }
                if (leftbits == 2) {
                  ret += BASE[(leftchar&3) << 4];
                  ret += PAD + PAD;
                } else if (leftbits == 4) {
                  ret += BASE[(leftchar&0xf) << 2];
                  ret += PAD;
                }
                return ret;
              }
              audio.src = 'data:audio/x-' + name.substr(-3) + ';base64,' + encode64(byteArray);
              finish(audio); // we don't wait for confirmation this worked - but it's worth trying
            };
            audio.src = url;
            // workaround for chrome bug 124926 - we do not always get oncanplaythrough or onerror
            Browser.safeSetTimeout(function() {
              finish(audio); // try to use it even though it is not necessarily ready to play
            }, 10000);
          } else {
            return fail();
          }
        };
        Module['preloadPlugins'].push(audioPlugin);
  
  
        // Canvas event setup
  
        function pointerLockChange() {
          Browser.pointerLock = document['pointerLockElement'] === Module['canvas'] ||
                                document['mozPointerLockElement'] === Module['canvas'] ||
                                document['webkitPointerLockElement'] === Module['canvas'] ||
                                document['msPointerLockElement'] === Module['canvas'];
        }
        var canvas = Module['canvas'];
        if (canvas) {
          // forced aspect ratio can be enabled by defining 'forcedAspectRatio' on Module
          // Module['forcedAspectRatio'] = 4 / 3;
  
          canvas.requestPointerLock = canvas['requestPointerLock'] ||
                                      canvas['mozRequestPointerLock'] ||
                                      canvas['webkitRequestPointerLock'] ||
                                      canvas['msRequestPointerLock'] ||
                                      function(){};
          canvas.exitPointerLock = document['exitPointerLock'] ||
                                   document['mozExitPointerLock'] ||
                                   document['webkitExitPointerLock'] ||
                                   document['msExitPointerLock'] ||
                                   function(){}; // no-op if function does not exist
          canvas.exitPointerLock = canvas.exitPointerLock.bind(document);
  
          document.addEventListener('pointerlockchange', pointerLockChange, false);
          document.addEventListener('mozpointerlockchange', pointerLockChange, false);
          document.addEventListener('webkitpointerlockchange', pointerLockChange, false);
          document.addEventListener('mspointerlockchange', pointerLockChange, false);
  
          if (Module['elementPointerLock']) {
            canvas.addEventListener("click", function(ev) {
              if (!Browser.pointerLock && Module['canvas'].requestPointerLock) {
                Module['canvas'].requestPointerLock();
                ev.preventDefault();
              }
            }, false);
          }
        }
      },createContext:function (canvas, useWebGL, setInModule, webGLContextAttributes) {
        if (useWebGL && Module.ctx && canvas == Module.canvas) return Module.ctx; // no need to recreate GL context if it's already been created for this canvas.
  
        var ctx;
        var contextHandle;
        if (useWebGL) {
          // For GLES2/desktop GL compatibility, adjust a few defaults to be different to WebGL defaults, so that they align better with the desktop defaults.
          var contextAttributes = {
            antialias: false,
            alpha: false,
            majorVersion: 1,
          };
  
          if (webGLContextAttributes) {
            for (var attribute in webGLContextAttributes) {
              contextAttributes[attribute] = webGLContextAttributes[attribute];
            }
          }
  
          // This check of existence of GL is here to satisfy Closure compiler, which yells if variable GL is referenced below but GL object is not
          // actually compiled in because application is not doing any GL operations. TODO: Ideally if GL is not being used, this function
          // Browser.createContext() should not even be emitted.
          if (typeof GL !== 'undefined') {
            contextHandle = GL.createContext(canvas, contextAttributes);
            if (contextHandle) {
              ctx = GL.getContext(contextHandle).GLctx;
            }
          }
        } else {
          ctx = canvas.getContext('2d');
        }
  
        if (!ctx) return null;
  
        if (setInModule) {
          if (!useWebGL) assert(typeof GLctx === 'undefined', 'cannot set in module if GLctx is used, but we are a non-GL context that would replace it');
  
          Module.ctx = ctx;
          if (useWebGL) GL.makeContextCurrent(contextHandle);
          Module.useWebGL = useWebGL;
          Browser.moduleContextCreatedCallbacks.forEach(function(callback) { callback() });
          Browser.init();
        }
        return ctx;
      },destroyContext:function (canvas, useWebGL, setInModule) {},fullscreenHandlersInstalled:false,lockPointer:undefined,resizeCanvas:undefined,requestFullscreen:function (lockPointer, resizeCanvas, vrDevice) {
        Browser.lockPointer = lockPointer;
        Browser.resizeCanvas = resizeCanvas;
        Browser.vrDevice = vrDevice;
        if (typeof Browser.lockPointer === 'undefined') Browser.lockPointer = true;
        if (typeof Browser.resizeCanvas === 'undefined') Browser.resizeCanvas = false;
        if (typeof Browser.vrDevice === 'undefined') Browser.vrDevice = null;
  
        var canvas = Module['canvas'];
        function fullscreenChange() {
          Browser.isFullscreen = false;
          var canvasContainer = canvas.parentNode;
          if ((document['fullscreenElement'] || document['mozFullScreenElement'] ||
               document['msFullscreenElement'] || document['webkitFullscreenElement'] ||
               document['webkitCurrentFullScreenElement']) === canvasContainer) {
            canvas.exitFullscreen = Browser.exitFullscreen;
            if (Browser.lockPointer) canvas.requestPointerLock();
            Browser.isFullscreen = true;
            if (Browser.resizeCanvas) {
              Browser.setFullscreenCanvasSize();
            } else {
              Browser.updateCanvasDimensions(canvas);
            }
          } else {
            // remove the full screen specific parent of the canvas again to restore the HTML structure from before going full screen
            canvasContainer.parentNode.insertBefore(canvas, canvasContainer);
            canvasContainer.parentNode.removeChild(canvasContainer);
  
            if (Browser.resizeCanvas) {
              Browser.setWindowedCanvasSize();
            } else {
              Browser.updateCanvasDimensions(canvas);
            }
          }
          if (Module['onFullScreen']) Module['onFullScreen'](Browser.isFullscreen);
          if (Module['onFullscreen']) Module['onFullscreen'](Browser.isFullscreen);
        }
  
        if (!Browser.fullscreenHandlersInstalled) {
          Browser.fullscreenHandlersInstalled = true;
          document.addEventListener('fullscreenchange', fullscreenChange, false);
          document.addEventListener('mozfullscreenchange', fullscreenChange, false);
          document.addEventListener('webkitfullscreenchange', fullscreenChange, false);
          document.addEventListener('MSFullscreenChange', fullscreenChange, false);
        }
  
        // create a new parent to ensure the canvas has no siblings. this allows browsers to optimize full screen performance when its parent is the full screen root
        var canvasContainer = document.createElement("div");
        canvas.parentNode.insertBefore(canvasContainer, canvas);
        canvasContainer.appendChild(canvas);
  
        // use parent of canvas as full screen root to allow aspect ratio correction (Firefox stretches the root to screen size)
        canvasContainer.requestFullscreen = canvasContainer['requestFullscreen'] ||
                                            canvasContainer['mozRequestFullScreen'] ||
                                            canvasContainer['msRequestFullscreen'] ||
                                           (canvasContainer['webkitRequestFullscreen'] ? function() { canvasContainer['webkitRequestFullscreen'](Element['ALLOW_KEYBOARD_INPUT']) } : null) ||
                                           (canvasContainer['webkitRequestFullScreen'] ? function() { canvasContainer['webkitRequestFullScreen'](Element['ALLOW_KEYBOARD_INPUT']) } : null);
  
        if (vrDevice) {
          canvasContainer.requestFullscreen({ vrDisplay: vrDevice });
        } else {
          canvasContainer.requestFullscreen();
        }
      },requestFullScreen:function (lockPointer, resizeCanvas, vrDevice) {
          err('Browser.requestFullScreen() is deprecated. Please call Browser.requestFullscreen instead.');
          Browser.requestFullScreen = function(lockPointer, resizeCanvas, vrDevice) {
            return Browser.requestFullscreen(lockPointer, resizeCanvas, vrDevice);
          }
          return Browser.requestFullscreen(lockPointer, resizeCanvas, vrDevice);
      },exitFullscreen:function () {
        // This is workaround for chrome. Trying to exit from fullscreen
        // not in fullscreen state will cause "TypeError: Document not active"
        // in chrome. See https://github.com/emscripten-core/emscripten/pull/8236
        if (!Browser.isFullscreen) {
          return false;
        }
  
        var CFS = document['exitFullscreen'] ||
                  document['cancelFullScreen'] ||
                  document['mozCancelFullScreen'] ||
                  document['msExitFullscreen'] ||
                  document['webkitCancelFullScreen'] ||
            (function() {});
        CFS.apply(document, []);
        return true;
      },nextRAF:0,fakeRequestAnimationFrame:function (func) {
        // try to keep 60fps between calls to here
        var now = Date.now();
        if (Browser.nextRAF === 0) {
          Browser.nextRAF = now + 1000/60;
        } else {
          while (now + 2 >= Browser.nextRAF) { // fudge a little, to avoid timer jitter causing us to do lots of delay:0
            Browser.nextRAF += 1000/60;
          }
        }
        var delay = Math.max(Browser.nextRAF - now, 0);
        setTimeout(func, delay);
      },requestAnimationFrame:function requestAnimationFrame(func) {
        if (typeof window === 'undefined') { // Provide fallback to setTimeout if window is undefined (e.g. in Node.js)
          Browser.fakeRequestAnimationFrame(func);
        } else {
          if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = window['requestAnimationFrame'] ||
                                           window['mozRequestAnimationFrame'] ||
                                           window['webkitRequestAnimationFrame'] ||
                                           window['msRequestAnimationFrame'] ||
                                           window['oRequestAnimationFrame'] ||
                                           Browser.fakeRequestAnimationFrame;
          }
          window.requestAnimationFrame(func);
        }
      },safeCallback:function (func) {
        return function() {
          if (!ABORT) return func.apply(null, arguments);
        };
      },allowAsyncCallbacks:true,queuedAsyncCallbacks:[],pauseAsyncCallbacks:function () {
        Browser.allowAsyncCallbacks = false;
      },resumeAsyncCallbacks:function () { // marks future callbacks as ok to execute, and synchronously runs any remaining ones right now
        Browser.allowAsyncCallbacks = true;
        if (Browser.queuedAsyncCallbacks.length > 0) {
          var callbacks = Browser.queuedAsyncCallbacks;
          Browser.queuedAsyncCallbacks = [];
          callbacks.forEach(function(func) {
            func();
          });
        }
      },safeRequestAnimationFrame:function (func) {
        return Browser.requestAnimationFrame(function() {
          if (ABORT) return;
          if (Browser.allowAsyncCallbacks) {
            func();
          } else {
            Browser.queuedAsyncCallbacks.push(func);
          }
        });
      },safeSetTimeout:function (func, timeout) {
        Module['noExitRuntime'] = true;
        return setTimeout(function() {
          if (ABORT) return;
          if (Browser.allowAsyncCallbacks) {
            func();
          } else {
            Browser.queuedAsyncCallbacks.push(func);
          }
        }, timeout);
      },safeSetInterval:function (func, timeout) {
        Module['noExitRuntime'] = true;
        return setInterval(function() {
          if (ABORT) return;
          if (Browser.allowAsyncCallbacks) {
            func();
          } // drop it on the floor otherwise, next interval will kick in
        }, timeout);
      },getMimetype:function (name) {
        return {
          'jpg': 'image/jpeg',
          'jpeg': 'image/jpeg',
          'png': 'image/png',
          'bmp': 'image/bmp',
          'ogg': 'audio/ogg',
          'wav': 'audio/wav',
          'mp3': 'audio/mpeg'
        }[name.substr(name.lastIndexOf('.')+1)];
      },getUserMedia:function (func) {
        if(!window.getUserMedia) {
          window.getUserMedia = navigator['getUserMedia'] ||
                                navigator['mozGetUserMedia'];
        }
        window.getUserMedia(func);
      },getMovementX:function (event) {
        return event['movementX'] ||
               event['mozMovementX'] ||
               event['webkitMovementX'] ||
               0;
      },getMovementY:function (event) {
        return event['movementY'] ||
               event['mozMovementY'] ||
               event['webkitMovementY'] ||
               0;
      },getMouseWheelDelta:function (event) {
        var delta = 0;
        switch (event.type) {
          case 'DOMMouseScroll':
            // 3 lines make up a step
            delta = event.detail / 3;
            break;
          case 'mousewheel':
            // 120 units make up a step
            delta = event.wheelDelta / 120;
            break;
          case 'wheel':
            delta = event.deltaY
            switch(event.deltaMode) {
              case 0:
                // DOM_DELTA_PIXEL: 100 pixels make up a step
                delta /= 100;
                break;
              case 1:
                // DOM_DELTA_LINE: 3 lines make up a step
                delta /= 3;
                break;
              case 2:
                // DOM_DELTA_PAGE: A page makes up 80 steps
                delta *= 80;
                break;
              default:
                throw 'unrecognized mouse wheel delta mode: ' + event.deltaMode;
            }
            break;
          default:
            throw 'unrecognized mouse wheel event: ' + event.type;
        }
        return delta;
      },mouseX:0,mouseY:0,mouseMovementX:0,mouseMovementY:0,touches:{},lastTouches:{},calculateMouseEvent:function (event) { // event should be mousemove, mousedown or mouseup
        if (Browser.pointerLock) {
          // When the pointer is locked, calculate the coordinates
          // based on the movement of the mouse.
          // Workaround for Firefox bug 764498
          if (event.type != 'mousemove' &&
              ('mozMovementX' in event)) {
            Browser.mouseMovementX = Browser.mouseMovementY = 0;
          } else {
            Browser.mouseMovementX = Browser.getMovementX(event);
            Browser.mouseMovementY = Browser.getMovementY(event);
          }
  
          // check if SDL is available
          if (typeof SDL != "undefined") {
            Browser.mouseX = SDL.mouseX + Browser.mouseMovementX;
            Browser.mouseY = SDL.mouseY + Browser.mouseMovementY;
          } else {
            // just add the mouse delta to the current absolut mouse position
            // FIXME: ideally this should be clamped against the canvas size and zero
            Browser.mouseX += Browser.mouseMovementX;
            Browser.mouseY += Browser.mouseMovementY;
          }
        } else {
          // Otherwise, calculate the movement based on the changes
          // in the coordinates.
          var rect = Module["canvas"].getBoundingClientRect();
          var cw = Module["canvas"].width;
          var ch = Module["canvas"].height;
  
          // Neither .scrollX or .pageXOffset are defined in a spec, but
          // we prefer .scrollX because it is currently in a spec draft.
          // (see: http://www.w3.org/TR/2013/WD-cssom-view-20131217/)
          var scrollX = ((typeof window.scrollX !== 'undefined') ? window.scrollX : window.pageXOffset);
          var scrollY = ((typeof window.scrollY !== 'undefined') ? window.scrollY : window.pageYOffset);
          // If this assert lands, it's likely because the browser doesn't support scrollX or pageXOffset
          // and we have no viable fallback.
          assert((typeof scrollX !== 'undefined') && (typeof scrollY !== 'undefined'), 'Unable to retrieve scroll position, mouse positions likely broken.');
  
          if (event.type === 'touchstart' || event.type === 'touchend' || event.type === 'touchmove') {
            var touch = event.touch;
            if (touch === undefined) {
              return; // the "touch" property is only defined in SDL
  
            }
            var adjustedX = touch.pageX - (scrollX + rect.left);
            var adjustedY = touch.pageY - (scrollY + rect.top);
  
            adjustedX = adjustedX * (cw / rect.width);
            adjustedY = adjustedY * (ch / rect.height);
  
            var coords = { x: adjustedX, y: adjustedY };
  
            if (event.type === 'touchstart') {
              Browser.lastTouches[touch.identifier] = coords;
              Browser.touches[touch.identifier] = coords;
            } else if (event.type === 'touchend' || event.type === 'touchmove') {
              var last = Browser.touches[touch.identifier];
              if (!last) last = coords;
              Browser.lastTouches[touch.identifier] = last;
              Browser.touches[touch.identifier] = coords;
            }
            return;
          }
  
          var x = event.pageX - (scrollX + rect.left);
          var y = event.pageY - (scrollY + rect.top);
  
          // the canvas might be CSS-scaled compared to its backbuffer;
          // SDL-using content will want mouse coordinates in terms
          // of backbuffer units.
          x = x * (cw / rect.width);
          y = y * (ch / rect.height);
  
          Browser.mouseMovementX = x - Browser.mouseX;
          Browser.mouseMovementY = y - Browser.mouseY;
          Browser.mouseX = x;
          Browser.mouseY = y;
        }
      },asyncLoad:function (url, onload, onerror, noRunDep) {
        var dep = !noRunDep ? getUniqueRunDependency('al ' + url) : '';
        Module['readAsync'](url, function(arrayBuffer) {
          assert(arrayBuffer, 'Loading data file "' + url + '" failed (no arrayBuffer).');
          onload(new Uint8Array(arrayBuffer));
          if (dep) removeRunDependency(dep);
        }, function(event) {
          if (onerror) {
            onerror();
          } else {
            throw 'Loading data file "' + url + '" failed.';
          }
        });
        if (dep) addRunDependency(dep);
      },resizeListeners:[],updateResizeListeners:function () {
        var canvas = Module['canvas'];
        Browser.resizeListeners.forEach(function(listener) {
          listener(canvas.width, canvas.height);
        });
      },setCanvasSize:function (width, height, noUpdates) {
        var canvas = Module['canvas'];
        Browser.updateCanvasDimensions(canvas, width, height);
        if (!noUpdates) Browser.updateResizeListeners();
      },windowedWidth:0,windowedHeight:0,setFullscreenCanvasSize:function () {
        // check if SDL is available
        if (typeof SDL != "undefined") {
          var flags = HEAPU32[((SDL.screen)>>2)];
          flags = flags | 0x00800000; // set SDL_FULLSCREEN flag
          HEAP32[((SDL.screen)>>2)]=flags
        }
        Browser.updateCanvasDimensions(Module['canvas']);
        Browser.updateResizeListeners();
      },setWindowedCanvasSize:function () {
        // check if SDL is available
        if (typeof SDL != "undefined") {
          var flags = HEAPU32[((SDL.screen)>>2)];
          flags = flags & ~0x00800000; // clear SDL_FULLSCREEN flag
          HEAP32[((SDL.screen)>>2)]=flags
        }
        Browser.updateCanvasDimensions(Module['canvas']);
        Browser.updateResizeListeners();
      },updateCanvasDimensions:function (canvas, wNative, hNative) {
        if (wNative && hNative) {
          canvas.widthNative = wNative;
          canvas.heightNative = hNative;
        } else {
          wNative = canvas.widthNative;
          hNative = canvas.heightNative;
        }
        var w = wNative;
        var h = hNative;
        if (Module['forcedAspectRatio'] && Module['forcedAspectRatio'] > 0) {
          if (w/h < Module['forcedAspectRatio']) {
            w = Math.round(h * Module['forcedAspectRatio']);
          } else {
            h = Math.round(w / Module['forcedAspectRatio']);
          }
        }
        if (((document['fullscreenElement'] || document['mozFullScreenElement'] ||
             document['msFullscreenElement'] || document['webkitFullscreenElement'] ||
             document['webkitCurrentFullScreenElement']) === canvas.parentNode) && (typeof screen != 'undefined')) {
           var factor = Math.min(screen.width / w, screen.height / h);
           w = Math.round(w * factor);
           h = Math.round(h * factor);
        }
        if (Browser.resizeCanvas) {
          if (canvas.width  != w) canvas.width  = w;
          if (canvas.height != h) canvas.height = h;
          if (typeof canvas.style != 'undefined') {
            canvas.style.removeProperty( "width");
            canvas.style.removeProperty("height");
          }
        } else {
          if (canvas.width  != wNative) canvas.width  = wNative;
          if (canvas.height != hNative) canvas.height = hNative;
          if (typeof canvas.style != 'undefined') {
            if (w != wNative || h != hNative) {
              canvas.style.setProperty( "width", w + "px", "important");
              canvas.style.setProperty("height", h + "px", "important");
            } else {
              canvas.style.removeProperty( "width");
              canvas.style.removeProperty("height");
            }
          }
        }
      },wgetRequests:{},nextWgetRequestHandle:0,getNextWgetRequestHandle:function () {
        var handle = Browser.nextWgetRequestHandle;
        Browser.nextWgetRequestHandle++;
        return handle;
      }};var AL={QUEUE_INTERVAL:25,QUEUE_LOOKAHEAD:0.1,DEVICE_NAME:"Emscripten OpenAL",CAPTURE_DEVICE_NAME:"Emscripten OpenAL capture",ALC_EXTENSIONS:{ALC_SOFT_pause_device:true,ALC_SOFT_HRTF:true},AL_EXTENSIONS:{AL_EXT_float32:true,AL_SOFT_loop_points:true,AL_SOFT_source_length:true,AL_EXT_source_distance_model:true,AL_SOFT_source_spatialize:true},_alcErr:0,alcErr:0,deviceRefCounts:{},alcStringCache:{},paused:false,stringCache:{},contexts:{},currentCtx:null,buffers:{0:{id:0,refCount:0,audioBuf:null,frequency:0,bytesPerSample:2,channels:1,length:0}},paramArray:[],_nextId:1,newId:function () {
        return AL.freeIds.length > 0 ? AL.freeIds.pop() : AL._nextId++;
      },freeIds:[],scheduleContextAudio:function (ctx) {
        // If we are animating using the requestAnimationFrame method, then the main loop does not run when in the background.
        // To give a perfect glitch-free audio stop when switching from foreground to background, we need to avoid updating
        // audio altogether when in the background, so detect that case and kill audio buffer streaming if so.
        if (Browser.mainLoop.timingMode === 1 /* EM_TIMING_RAF */ && document['visibilityState'] != 'visible') {
          return;
        }
  
        for (var i in ctx.sources) {
          AL.scheduleSourceAudio(ctx.sources[i]);
        }
      },scheduleSourceAudio:function (src, lookahead) {
        // See comment on scheduleContextAudio above.
        if (Browser.mainLoop.timingMode === 1 /*EM_TIMING_RAF*/ && document['visibilityState'] != 'visible') {
          return;
        }
        if (src.state !== 0x1012 /* AL_PLAYING */) {
          return;
        }
  
        var currentTime = AL.updateSourceTime(src);
  
        var startTime = src.bufStartTime;
        var startOffset = src.bufOffset;
        var bufCursor = src.bufsProcessed;
  
        // Advance past any audio that is already scheduled
        for (var i = 0; i < src.audioQueue.length; i++) {
          var audioSrc = src.audioQueue[i];
          startTime = audioSrc._startTime + audioSrc._duration;
          startOffset = 0.0;
          bufCursor += audioSrc._skipCount + 1;
        }
  
        if (!lookahead) {
          lookahead = AL.QUEUE_LOOKAHEAD;
        }
        var lookaheadTime = currentTime + lookahead;
        var skipCount = 0;
        while (startTime < lookaheadTime) {
          if (bufCursor >= src.bufQueue.length) {
            if (src.looping) {
              bufCursor %= src.bufQueue.length;
            } else {
              break;
            }
          }
  
          var buf = src.bufQueue[bufCursor % src.bufQueue.length];
          // If the buffer contains no data, skip it
          if (buf.length === 0) {
            skipCount++;
            // If we've gone through the whole queue and everything is 0 length, just give up
            if (skipCount === src.bufQueue.length) {
              break;
            }
          } else {
            var audioSrc = src.context.audioCtx.createBufferSource();
            audioSrc.buffer = buf.audioBuf;
            audioSrc.playbackRate.value = src.playbackRate;
            if (buf.audioBuf._loopStart || buf.audioBuf._loopEnd) {
              audioSrc.loopStart = buf.audioBuf._loopStart;
              audioSrc.loopEnd = buf.audioBuf._loopEnd;
            }
  
            var duration = 0.0;
            // If the source is a looping static buffer, use native looping for gapless playback
            if (src.type === 0x1028 /* AL_STATIC */ && src.looping) {
              duration = Number.POSITIVE_INFINITY;
              audioSrc.loop = true;
              if (buf.audioBuf._loopStart) {
                audioSrc.loopStart = buf.audioBuf._loopStart;
              }
              if (buf.audioBuf._loopEnd) {
                audioSrc.loopEnd = buf.audioBuf._loopEnd;
              }
            } else {
              duration = (buf.audioBuf.duration - startOffset) / src.playbackRate;
            }
  
            audioSrc._startOffset = startOffset;
            audioSrc._duration = duration;
            audioSrc._skipCount = skipCount;
            skipCount = 0;
  
            audioSrc.connect(src.gain);
  
            if (typeof(audioSrc.start) !== 'undefined') {
              // Sample the current time as late as possible to mitigate drift
              startTime = Math.max(startTime, src.context.audioCtx.currentTime);
              audioSrc.start(startTime, startOffset);
            } else if (typeof(audioSrc.noteOn) !== 'undefined') {
              startTime = Math.max(startTime, src.context.audioCtx.currentTime);
              audioSrc.noteOn(startTime);
            }
            audioSrc._startTime = startTime;
            src.audioQueue.push(audioSrc);
  
            startTime += duration;
          }
  
          startOffset = 0.0;
          bufCursor++;
        }
      },updateSourceTime:function (src) {
        var currentTime = src.context.audioCtx.currentTime;
        if (src.state !== 0x1012 /* AL_PLAYING */) {
          return currentTime;
        }
  
        // if the start time is unset, determine it based on the current offset.
        // This will be the case when a source is resumed after being paused, and
        // allows us to pretend that the source actually started playing some time
        // in the past such that it would just now have reached the stored offset.
        if (!isFinite(src.bufStartTime)) {
          src.bufStartTime = currentTime - src.bufOffset / src.playbackRate;
          src.bufOffset = 0.0;
        }
  
        var nextStartTime = 0.0;
        while (src.audioQueue.length) {
          var audioSrc = src.audioQueue[0];
          src.bufsProcessed += audioSrc._skipCount;
          nextStartTime = audioSrc._startTime + audioSrc._duration; // n.b. audioSrc._duration already factors in playbackRate, so no divide by src.playbackRate on it.
  
          if (currentTime < nextStartTime) {
            break;
          }
  
          src.audioQueue.shift();
          src.bufStartTime = nextStartTime;
          src.bufOffset = 0.0;
          src.bufsProcessed++;
        }
  
        if (src.bufsProcessed >= src.bufQueue.length && !src.looping) {
          // The source has played its entire queue and is non-looping, so just mark it as stopped.
          AL.setSourceState(src, 0x1014 /* AL_STOPPED */);
        } else if (src.type === 0x1028 /* AL_STATIC */ && src.looping) {
          // If the source is a looping static buffer, determine the buffer offset based on the loop points
          var buf = src.bufQueue[0];
          if (buf.length === 0) {
            src.bufOffset = 0.0;
          } else {
            var delta = (currentTime - src.bufStartTime) * src.playbackRate;
            var loopStart = buf.audioBuf._loopStart || 0.0;
            var loopEnd = buf.audioBuf._loopEnd || buf.audioBuf.duration;
            if (loopEnd <= loopStart) {
              loopEnd = buf.audioBuf.duration;
            }
  
            if (delta < loopEnd) {
              src.bufOffset = delta;
            } else {
              src.bufOffset = loopStart + (delta - loopStart) % (loopEnd - loopStart);
            }
          }
        } else if (src.audioQueue[0]) {
          // The source is still actively playing, so we just need to calculate where we are in the current buffer
          // so it can be remembered if the source gets paused.
          src.bufOffset = (currentTime - src.audioQueue[0]._startTime) * src.playbackRate;
        } else {
          // The source hasn't finished yet, but there is no scheduled audio left for it. This can be because
          // the source has just been started/resumed, or due to an underrun caused by a long blocking operation.
          // We need to determine what state we would be in by this point in time so that when we next schedule
          // audio playback, it will be just as if no underrun occurred.
  
          if (src.type !== 0x1028 /* AL_STATIC */ && src.looping) {
            // if the source is a looping buffer queue, let's first calculate the queue duration, so we can
            // quickly fast forward past any full loops of the queue and only worry about the remainder.
            var srcDuration = AL.sourceDuration(src) / src.playbackRate;
            if (srcDuration > 0.0) {
              src.bufStartTime += Math.floor((currentTime - src.bufStartTime) / srcDuration) * srcDuration;
            }
          }
  
          // Since we've already skipped any full-queue loops if there were any, we just need to find
          // out where in the queue the remaining time puts us, which won't require stepping through the
          // entire queue more than once.
          for (var i = 0; i < src.bufQueue.length; i++) {
            if (src.bufsProcessed >= src.bufQueue.length) {
              if (src.looping) {
                src.bufsProcessed %= src.bufQueue.length;
              } else {
                AL.setSourceState(src, 0x1014 /* AL_STOPPED */);
                break;
              }
            }
  
            var buf = src.bufQueue[src.bufsProcessed];
            if (buf.length > 0) {
              nextStartTime = src.bufStartTime + buf.audioBuf.duration / src.playbackRate;
  
              if (currentTime < nextStartTime) {
                src.bufOffset = (currentTime - src.bufStartTime) * src.playbackRate;
                break;
              }
  
              src.bufStartTime = nextStartTime;
            }
  
            src.bufOffset = 0.0;
            src.bufsProcessed++;
          }
        }
  
        return currentTime;
      },cancelPendingSourceAudio:function (src) {
        AL.updateSourceTime(src);
  
        for (var i = 1; i < src.audioQueue.length; i++) {
          var audioSrc = src.audioQueue[i];
          audioSrc.stop();
        }
  
        if (src.audioQueue.length > 1) {
          src.audioQueue.length = 1;
        }
      },stopSourceAudio:function (src) {
        for (var i = 0; i < src.audioQueue.length; i++) {
          src.audioQueue[i].stop();
        }
        src.audioQueue.length = 0;
      },setSourceState:function (src, state) {
        if (state === 0x1012 /* AL_PLAYING */) {
          if (src.state === 0x1012 /* AL_PLAYING */ || src.state == 0x1014 /* AL_STOPPED */) {
            src.bufsProcessed = 0;
            src.bufOffset = 0.0;
          } else {
          }
  
          AL.stopSourceAudio(src);
  
          src.state = 0x1012 /* AL_PLAYING */;
          src.bufStartTime = Number.NEGATIVE_INFINITY;
          AL.scheduleSourceAudio(src);
        } else if (state === 0x1013 /* AL_PAUSED */) {
          if (src.state === 0x1012 /* AL_PLAYING */) {
            // Store off the current offset to restore with on resume.
            AL.updateSourceTime(src);
            AL.stopSourceAudio(src);
  
            src.state = 0x1013 /* AL_PAUSED */;
          }
        } else if (state === 0x1014 /* AL_STOPPED */) {
          if (src.state !== 0x1011 /* AL_INITIAL */) {
            src.state = 0x1014 /* AL_STOPPED */;
            src.bufsProcessed = src.bufQueue.length;
            src.bufStartTime = Number.NEGATIVE_INFINITY;
            src.bufOffset = 0.0;
            AL.stopSourceAudio(src);
          }
        } else if (state === 0x1011 /* AL_INITIAL */) {
          if (src.state !== 0x1011 /* AL_INITIAL */) {
            src.state = 0x1011 /* AL_INITIAL */;
            src.bufsProcessed = 0;
            src.bufStartTime = Number.NEGATIVE_INFINITY;
            src.bufOffset = 0.0;
            AL.stopSourceAudio(src);
          }
        }
      },initSourcePanner:function (src) {
        if (src.type === 0x1030 /* AL_UNDETERMINED */) {
          return;
        }
  
        // Find the first non-zero buffer in the queue to determine the proper format
        var templateBuf = AL.buffers[0];
        for (var i = 0; i < src.bufQueue.length; i++) {
          if (src.bufQueue[i].id !== 0) {
            templateBuf = src.bufQueue[i];
            break;
          }
        }
        // Create a panner if AL_SOURCE_SPATIALIZE_SOFT is set to true, or alternatively if it's set to auto and the source is mono
        if (src.spatialize === 1 /* AL_TRUE */ || (src.spatialize === 2 /* AL_AUTO_SOFT */ && templateBuf.channels === 1)) {
          if (src.panner) {
            return;
          }
          src.panner = src.context.audioCtx.createPanner();
  
          AL.updateSourceGlobal(src);
          AL.updateSourceSpace(src);
  
          src.panner.connect(src.context.gain);
          src.gain.disconnect();
          src.gain.connect(src.panner);
        } else {
          if (!src.panner) {
            return;
          }
  
          src.panner.disconnect();
          src.gain.disconnect();
          src.gain.connect(src.context.gain);
          src.panner = null;
        }
      },updateContextGlobal:function (ctx) {
        for (var i in ctx.sources) {
          AL.updateSourceGlobal(ctx.sources[i]);
        }
      },updateSourceGlobal:function (src) {
        var panner = src.panner;
        if (!panner) {
          return;
        }
  
        panner.refDistance = src.refDistance;
        panner.maxDistance = src.maxDistance;
        panner.rolloffFactor = src.rolloffFactor;
  
        panner.panningModel = src.context.hrtf ? 'HRTF' : 'equalpower';
  
        // Use the source's distance model if AL_SOURCE_DISTANCE_MODEL is enabled
        var distanceModel = src.context.sourceDistanceModel ? src.distanceModel : src.context.distanceModel;
        switch (distanceModel) {
        case 0 /* AL_NONE */:
          panner.distanceModel = 'inverse';
          panner.refDistance = 3.40282e38 /* FLT_MAX */;
          break;
        case 0xd001 /* AL_INVERSE_DISTANCE */:
        case 0xd002 /* AL_INVERSE_DISTANCE_CLAMPED */:
          panner.distanceModel = 'inverse';
          break;
        case 0xd003 /* AL_LINEAR_DISTANCE */:
        case 0xd004 /* AL_LINEAR_DISTANCE_CLAMPED */:
          panner.distanceModel = 'linear';
          break;
        case 0xd005 /* AL_EXPONENT_DISTANCE */:
        case 0xd006 /* AL_EXPONENT_DISTANCE_CLAMPED */:
          panner.distanceModel = 'exponential';
          break;
        }
      },updateListenerSpace:function (ctx) {
        var listener = ctx.audioCtx.listener;
        if (listener.positionX) {
          listener.positionX.value = ctx.listener.position[0];
          listener.positionY.value = ctx.listener.position[1];
          listener.positionZ.value = ctx.listener.position[2];
        } else {
          listener.setPosition(ctx.listener.position[0], ctx.listener.position[1], ctx.listener.position[2]);
        }
        if (listener.forwardX) {
          listener.forwardX.value = ctx.listener.direction[0];
          listener.forwardY.value = ctx.listener.direction[1];
          listener.forwardZ.value = ctx.listener.direction[2];
          listener.upX.value = ctx.listener.up[0];
          listener.upY.value = ctx.listener.up[1];
          listener.upZ.value = ctx.listener.up[2];
        } else {
          listener.setOrientation(
            ctx.listener.direction[0], ctx.listener.direction[1], ctx.listener.direction[2],
            ctx.listener.up[0], ctx.listener.up[1], ctx.listener.up[2]);
        }
  
        // Update sources that are relative to the listener
        for (var i in ctx.sources) {
          AL.updateSourceSpace(ctx.sources[i]);
        }
      },updateSourceSpace:function (src) {
        if (!src.panner) {
          return;
        }
        var panner = src.panner;
  
        var posX = src.position[0];
        var posY = src.position[1];
        var posZ = src.position[2];
        var dirX = src.direction[0];
        var dirY = src.direction[1];
        var dirZ = src.direction[2];
  
        var listener = src.context.listener;
        var lPosX = listener.position[0];
        var lPosY = listener.position[1];
        var lPosZ = listener.position[2];
  
        // WebAudio does spatialization in world-space coordinates, meaning both the buffer sources and
        // the listener position are in the same absolute coordinate system relative to a fixed origin.
        // By default, OpenAL works this way as well, but it also provides a "listener relative" mode, where
        // a buffer source's coordinate are interpreted not in absolute world space, but as being relative
        // to the listener object itself, so as the listener moves the source appears to move with it
        // with no update required. Since web audio does not support this mode, we must transform the source
        // coordinates from listener-relative space to absolute world space.
        //
        // We do this via affine transformation matrices applied to the source position and source direction.
        // A change-of-basis converts from listener-space displacements to world-space displacements,
        // which must be done for both the source position and direction. Lastly, the source position must be
        // added to the listener position to get the final source position, since the source position represents
        // a displacement from the listener.
        if (src.relative) {
          // Negate the listener direction since forward is -Z.
          var lBackX = -listener.direction[0];
          var lBackY = -listener.direction[1];
          var lBackZ = -listener.direction[2];
          var lUpX = listener.up[0];
          var lUpY = listener.up[1];
          var lUpZ = listener.up[2];
  
          var inverseMagnitude = function(x, y, z) {
            var length = Math.sqrt(x * x + y * y + z * z);
  
            if (length < Number.EPSILON) {
              return 0.0;
            }
  
            return 1.0 / length;
          };
  
          // Normalize the Back vector
          var invMag = inverseMagnitude(lBackX, lBackY, lBackZ);
          lBackX *= invMag;
          lBackY *= invMag;
          lBackZ *= invMag;
  
          // ...and the Up vector
          invMag = inverseMagnitude(lUpX, lUpY, lUpZ);
          lUpX *= invMag;
          lUpY *= invMag;
          lUpZ *= invMag;
  
          // Calculate the Right vector as the cross product of the Up and Back vectors
          var lRightX = (lUpY * lBackZ - lUpZ * lBackY);
          var lRightY = (lUpZ * lBackX - lUpX * lBackZ);
          var lRightZ = (lUpX * lBackY - lUpY * lBackX);
  
          // Back and Up might not be exactly perpendicular, so the cross product also needs normalization
          invMag = inverseMagnitude(lRightX, lRightY, lRightZ);
          lRightX *= invMag;
          lRightY *= invMag;
          lRightZ *= invMag;
  
          // Recompute Up from the now orthonormal Right and Back vectors so we have a fully orthonormal basis
          lUpX = (lBackY * lRightZ - lBackZ * lRightY);
          lUpY = (lBackZ * lRightX - lBackX * lRightZ);
          lUpZ = (lBackX * lRightY - lBackY * lRightX);
  
          var oldX = dirX;
          var oldY = dirY;
          var oldZ = dirZ;
  
          // Use our 3 vectors to apply a change-of-basis matrix to the source direction
          dirX = oldX * lRightX + oldY * lUpX + oldZ * lBackX;
          dirY = oldX * lRightY + oldY * lUpY + oldZ * lBackY;
          dirZ = oldX * lRightZ + oldY * lUpZ + oldZ * lBackZ;
  
          oldX = posX;
          oldY = posY;
          oldZ = posZ;
  
          // ...and to the source position
          posX = oldX * lRightX + oldY * lUpX + oldZ * lBackX;
          posY = oldX * lRightY + oldY * lUpY + oldZ * lBackY;
          posZ = oldX * lRightZ + oldY * lUpZ + oldZ * lBackZ;
  
          // The change-of-basis corrects the orientation, but the origin is still the listener.
          // Translate the source position by the listener position to finish.
          posX += lPosX;
          posY += lPosY;
          posZ += lPosZ;
        }
  
        if (panner.positionX) {
          panner.positionX.value = posX;
          panner.positionY.value = posY;
          panner.positionZ.value = posZ;
        } else {
          panner.setPosition(posX, posY, posZ);
        }
        if (panner.orientationX) {
          panner.orientationX.value = dirX;
          panner.orientationY.value = dirY;
          panner.orientationZ.value = dirZ;
        } else {
          panner.setOrientation(dirX, dirY, dirZ);
        }
  
        var oldShift = src.dopplerShift;
        var velX = src.velocity[0];
        var velY = src.velocity[1];
        var velZ = src.velocity[2];
        var lVelX = listener.velocity[0];
        var lVelY = listener.velocity[1];
        var lVelZ = listener.velocity[2];
        if (posX === lPosX && posY === lPosY && posZ === lPosZ
          || velX === lVelX && velY === lVelY && velZ === lVelZ)
        {
          src.dopplerShift = 1.0;
        } else {
          // Doppler algorithm from 1.1 spec
          var speedOfSound = src.context.speedOfSound;
          var dopplerFactor = src.context.dopplerFactor;
  
          var slX = lPosX - posX;
          var slY = lPosY - posY;
          var slZ = lPosZ - posZ;
  
          var magSl = Math.sqrt(slX * slX + slY * slY + slZ * slZ);
          var vls = (slX * lVelX + slY * lVelY + slZ * lVelZ) / magSl;
          var vss = (slX * velX + slY * velY + slZ * velZ) / magSl;
  
          vls = Math.min(vls, speedOfSound / dopplerFactor);
          vss = Math.min(vss, speedOfSound / dopplerFactor);
  
          src.dopplerShift = (speedOfSound - dopplerFactor * vls) / (speedOfSound - dopplerFactor * vss);
        }
        if (src.dopplerShift !== oldShift) {
          AL.updateSourceRate(src);
        }
      },updateSourceRate:function (src) {
        if (src.state === 0x1012 /* AL_PLAYING */) {
          // clear scheduled buffers
          AL.cancelPendingSourceAudio(src);
  
          var audioSrc = src.audioQueue[0];
          if (!audioSrc) {
            return; // It is possible that AL.scheduleContextAudio() has not yet fed the next buffer, if so, skip.
          }
  
          var duration;
          if (src.type === 0x1028 /* AL_STATIC */ && src.looping) {
            duration = Number.POSITIVE_INFINITY;
          } else {
            // audioSrc._duration is expressed after factoring in playbackRate, so when changing playback rate, need
            // to recompute/rescale the rate to the new playback speed.
            duration = (audioSrc.buffer.duration - audioSrc._startOffset) / src.playbackRate;
          }
  
          audioSrc._duration = duration;
          audioSrc.playbackRate.value = src.playbackRate;
  
          // reschedule buffers with the new playbackRate
          AL.scheduleSourceAudio(src);
        }
      },sourceDuration:function (src) {
        var length = 0.0;
        for (var i = 0; i < src.bufQueue.length; i++) {
          var audioBuf = src.bufQueue[i].audioBuf;
          length += audioBuf ? audioBuf.duration : 0.0;
        }
        return length;
      },sourceTell:function (src) {
        AL.updateSourceTime(src);
  
        var offset = 0.0;
        for (var i = 0; i < src.bufsProcessed; i++) {
          offset += src.bufQueue[i].audioBuf.duration;
        }
        offset += src.bufOffset;
  
        return offset;
      },sourceSeek:function (src, offset) {
        var playing = src.state == 0x1012 /* AL_PLAYING */;
        if (playing) {
          AL.setSourceState(src, 0x1011 /* AL_INITIAL */);
        }
  
        if (src.bufQueue[src.bufsProcessed].audioBuf !== null) {
          src.bufsProcessed = 0;
          while (offset > src.bufQueue[src.bufsProcessed].audioBuf.duration) {
            offset -= src.bufQueue[src.bufsProcessed].audiobuf.duration;
            src.bufsProcessed++;
          }
  
          src.bufOffset = offset;
        }
  
        if (playing) {
          AL.setSourceState(src, 0x1012 /* AL_PLAYING */);
        }
      },getGlobalParam:function (funcname, param) {
        if (!AL.currentCtx) {
          return null;
        }
  
        switch (param) {
        case 0xC000 /* AL_DOPPLER_FACTOR */:
          return AL.currentCtx.dopplerFactor;
        case 0xC003 /* AL_SPEED_OF_SOUND */:
          return AL.currentCtx.speedOfSound;
        case 0xD000 /* AL_DISTANCE_MODEL */:
          return AL.currentCtx.distanceModel;
        default:
          AL.currentCtx.err = 0xA002 /* AL_INVALID_ENUM */;
          return null;
        }
      },setGlobalParam:function (funcname, param, value) {
        if (!AL.currentCtx) {
          return;
        }
  
        switch (param) {
        case 0xC000 /* AL_DOPPLER_FACTOR */:
          if (!Number.isFinite(value) || value < 0.0) { // Strictly negative values are disallowed
            AL.currentCtx.err = 0xA003 /* AL_INVALID_VALUE */;
            return;
          }
  
          AL.currentCtx.dopplerFactor = value;
          AL.updateListenerSpace(AL.currentCtx);
          break;
        case 0xC003 /* AL_SPEED_OF_SOUND */:
          if (!Number.isFinite(value) || value <= 0.0) { // Negative or zero values are disallowed
            AL.currentCtx.err = 0xA003 /* AL_INVALID_VALUE */;
            return;
          }
  
          AL.currentCtx.speedOfSound = value;
          AL.updateListenerSpace(AL.currentCtx);
          break;
        case 0xD000 /* AL_DISTANCE_MODEL */:
          switch (value) {
          case 0 /* AL_NONE */:
          case 0xd001 /* AL_INVERSE_DISTANCE */:
          case 0xd002 /* AL_INVERSE_DISTANCE_CLAMPED */:
          case 0xd003 /* AL_LINEAR_DISTANCE */:
          case 0xd004 /* AL_LINEAR_DISTANCE_CLAMPED */:
          case 0xd005 /* AL_EXPONENT_DISTANCE */:
          case 0xd006 /* AL_EXPONENT_DISTANCE_CLAMPED */:
            AL.currentCtx.distanceModel = value;
            AL.updateContextGlobal(AL.currentCtx);
            break;
          default:
            AL.currentCtx.err = 0xA003 /* AL_INVALID_VALUE */;
            return;
          }
          break;
        default:
          AL.currentCtx.err = 0xA002 /* AL_INVALID_ENUM */;
          return;
        }
      },getListenerParam:function (funcname, param) {
        if (!AL.currentCtx) {
          return null;
        }
  
        switch (param) {
        case 0x1004 /* AL_POSITION */:
          return AL.currentCtx.listener.position;
        case 0x1006 /* AL_VELOCITY */:
          return AL.currentCtx.listener.velocity;
        case 0x100F /* AL_ORIENTATION */:
          return AL.currentCtx.listener.direction.concat(AL.currentCtx.listener.up);
        case 0x100A /* AL_GAIN */:
          return AL.currentCtx.gain.gain.value;
        default:
          AL.currentCtx.err = 0xA002 /* AL_INVALID_ENUM */;
          return null;
        }
      },setListenerParam:function (funcname, param, value) {
        if (!AL.currentCtx) {
          return;
        }
        if (value === null) {
          AL.currentCtx.err = 0xA002 /* AL_INVALID_ENUM */;
          return;
        }
  
        var listener = AL.currentCtx.listener;
        switch (param) {
        case 0x1004 /* AL_POSITION */:
          if (!Number.isFinite(value[0]) || !Number.isFinite(value[1]) || !Number.isFinite(value[2])) {
            AL.currentCtx.err = 0xA003 /* AL_INVALID_VALUE */;
            return;
          }
  
          listener.position[0] = value[0];
          listener.position[1] = value[1];
          listener.position[2] = value[2];
          AL.updateListenerSpace(AL.currentCtx);
          break;
        case 0x1006 /* AL_VELOCITY */:
          if (!Number.isFinite(value[0]) || !Number.isFinite(value[1]) || !Number.isFinite(value[2])) {
            AL.currentCtx.err = 0xA003 /* AL_INVALID_VALUE */;
            return;
          }
  
          listener.velocity[0] = value[0];
          listener.velocity[1] = value[1];
          listener.velocity[2] = value[2];
          AL.updateListenerSpace(AL.currentCtx);
          break;
        case 0x100A /* AL_GAIN */:
          if (!Number.isFinite(value) || value < 0.0) {
            AL.currentCtx.err = 0xA003 /* AL_INVALID_VALUE */;
            return;
          }
  
          AL.currentCtx.gain.gain.value = value;
          break;
        case 0x100F /* AL_ORIENTATION */:
          if (!Number.isFinite(value[0]) || !Number.isFinite(value[1]) || !Number.isFinite(value[2])
            || !Number.isFinite(value[3]) || !Number.isFinite(value[4]) || !Number.isFinite(value[5])
          ) {
            AL.currentCtx.err = 0xA003 /* AL_INVALID_VALUE */;
            return;
          }
  
          listener.direction[0] = value[0];
          listener.direction[1] = value[1];
          listener.direction[2] = value[2];
          listener.up[0] = value[3];
          listener.up[1] = value[4];
          listener.up[2] = value[5];
          AL.updateListenerSpace(AL.currentCtx);
          break;
        default:
          AL.currentCtx.err = 0xA002 /* AL_INVALID_ENUM */;
          return;
        }
      },getBufferParam:function (funcname, bufferId, param) {
        if (!AL.currentCtx) {
          return;
        }
        var buf = AL.buffers[bufferId];
        if (!buf || bufferId === 0) {
          AL.currentCtx.err = 0xA001 /* AL_INVALID_NAME */;
          return;
        }
  
        switch (param) {
        case 0x2001 /* AL_FREQUENCY */:
          return buf.frequency;
        case 0x2002 /* AL_BITS */:
          return buf.bytesPerSample * 8;
        case 0x2003 /* AL_CHANNELS */:
          return buf.channels;
        case 0x2004 /* AL_SIZE */:
          return buf.length * buf.bytesPerSample * buf.channels;
        case 0x2015 /* AL_LOOP_POINTS_SOFT */:
          if (buf.length === 0) {
            return [0, 0];
          } else {
            return [
              (buf.audioBuf._loopStart || 0.0) * buf.frequency,
              (buf.audioBuf._loopEnd || buf.length) * buf.frequency
            ];
          }
        default:
          AL.currentCtx.err = 0xA002 /* AL_INVALID_ENUM */;
          return null;
        }
      },setBufferParam:function (funcname, bufferId, param, value) {
        if (!AL.currentCtx) {
          return;
        }
        var buf = AL.buffers[bufferId];
        if (!buf || bufferId === 0) {
          AL.currentCtx.err = 0xA001 /* AL_INVALID_NAME */;
          return;
        }
        if (value === null) {
          AL.currentCtx.err = 0xA002 /* AL_INVALID_ENUM */;
          return;
        }
  
        switch (param) {
        case 0x2004 /* AL_SIZE */:
          if (value !== 0) {
            AL.currentCtx.err = 0xA003 /* AL_INVALID_VALUE */;
            return;
          }
  
          // Per the spec, setting AL_SIZE to 0 is a legal NOP.
          break;
        case 0x2015 /* AL_LOOP_POINTS_SOFT */:
          if (value[0] < 0 || value[0] > buf.length || value[1] < 0 || value[1] > buf.Length || value[0] >= value[1]) {
            AL.currentCtx.err = 0xA003 /* AL_INVALID_VALUE */;
            return;
          }
          if (buf.refCount > 0) {
            AL.currentCtx.err = 0xA004 /* AL_INVALID_OPERATION */;
            return;
          }
  
          if (buf.audioBuf) {
            buf.audioBuf._loopStart = value[0] / buf.frequency;
            buf.audioBuf._loopEnd = value[1] / buf.frequency;
          }
          break;
        default:
          AL.currentCtx.err = 0xA002 /* AL_INVALID_ENUM */;
          return;
        }
      },getSourceParam:function (funcname, sourceId, param) {
        if (!AL.currentCtx) {
          return null;
        }
        var src = AL.currentCtx.sources[sourceId];
        if (!src) {
          AL.currentCtx.err = 0xA001 /* AL_INVALID_NAME */;
          return null;
        }
  
        switch (param) {
        case 0x202 /* AL_SOURCE_RELATIVE */:
          return src.relative;
        case 0x1001 /* AL_CONE_INNER_ANGLE */:
          return src.coneInnerAngle;
        case 0x1002 /* AL_CONE_OUTER_ANGLE */:
          return src.coneOuterAngle;
        case 0x1003 /* AL_PITCH */:
          return src.pitch;
        case 0x1004 /* AL_POSITION */:
          return src.position;
        case 0x1005 /* AL_DIRECTION */:
          return src.direction;
        case 0x1006 /* AL_VELOCITY */:
          return src.velocity;
        case 0x1007 /* AL_LOOPING */:
          return src.looping;
        case 0x1009 /* AL_BUFFER */:
          if (src.type === 0x1028 /* AL_STATIC */) {
            return src.bufQueue[0].id;
          } else {
            return 0;
          }
        case 0x100A /* AL_GAIN */:
          return src.gain.gain.value;
         case 0x100D /* AL_MIN_GAIN */:
          return src.minGain;
        case 0x100E /* AL_MAX_GAIN */:
          return src.maxGain;
        case 0x1010 /* AL_SOURCE_STATE */:
          return src.state;
        case 0x1015 /* AL_BUFFERS_QUEUED */:
          if (src.bufQueue.length === 1 && src.bufQueue[0].id === 0) {
            return 0;
          } else {
            return src.bufQueue.length;
          }
        case 0x1016 /* AL_BUFFERS_PROCESSED */:
          if ((src.bufQueue.length === 1 && src.bufQueue[0].id === 0) || src.looping) {
            return 0;
          } else {
            return src.bufsProcessed;
          }
        case 0x1020 /* AL_REFERENCE_DISTANCE */:
          return src.refDistance;
        case 0x1021 /* AL_ROLLOFF_FACTOR */:
          return src.rolloffFactor;
        case 0x1022 /* AL_CONE_OUTER_GAIN */:
          return src.coneOuterGain;
        case 0x1023 /* AL_MAX_DISTANCE */:
          return src.maxDistance;
        case 0x1024 /* AL_SEC_OFFSET */:
          return AL.sourceTell(src);
        case 0x1025 /* AL_SAMPLE_OFFSET */:
          var offset = AL.sourceTell(src);
          if (offset > 0.0) {
            offset *= src.bufQueue[0].frequency;
          }
          return offset;
        case 0x1026 /* AL_BYTE_OFFSET */:
          var offset = AL.sourceTell(src);
          if (offset > 0.0) {
            offset *= src.bufQueue[0].frequency * src.bufQueue[0].bytesPerSample;
          }
          return offset;
        case 0x1027 /* AL_SOURCE_TYPE */:
          return src.type;
        case 0x1214 /* AL_SOURCE_SPATIALIZE_SOFT */:
          return src.spatialize;
        case 0x2009 /* AL_BYTE_LENGTH_SOFT */: 
          var length = 0;
          var bytesPerFrame = 0;
          for (var i = 0; i < src.bufQueue.length; i++) {
            length += src.bufQueue[i].length;
            if (src.bufQueue[i].id !== 0) {
              bytesPerFrame = src.bufQueue[i].bytesPerSample * src.bufQueue[i].channels;
            }
          }
          return length * bytesPerFrame;
        case 0x200A /* AL_SAMPLE_LENGTH_SOFT */:
          var length = 0;
          for (var i = 0; i < src.bufQueue.length; i++) {
            length += src.bufQueue[i].length;
          }
          return length;
        case 0x200B /* AL_SEC_LENGTH_SOFT */:
          return AL.sourceDuration(src);
        case 0xD000 /* AL_DISTANCE_MODEL */:
          return src.distanceModel;
        default:
          AL.currentCtx.err = 0xA002 /* AL_INVALID_ENUM */;
          return null;
        }
      },setSourceParam:function (funcname, sourceId, param, value) {
        if (!AL.currentCtx) {
          return;
        }
        var src = AL.currentCtx.sources[sourceId];
        if (!src) {
          AL.currentCtx.err = 0xA001 /* AL_INVALID_NAME */;
          return;
        }
        if (value === null) {
          AL.currentCtx.err = 0xA002 /* AL_INVALID_ENUM */;
          return;
        }
  
        switch (param) {
        case 0x202 /* AL_SOURCE_RELATIVE */:
          if (value === 1 /* AL_TRUE */) {
            src.relative = true;
            AL.updateSourceSpace(src);
          } else if (value === 0 /* AL_FALSE */) {
            src.relative = false;
            AL.updateSourceSpace(src);
          } else {
            AL.currentCtx.err = 0xA003 /* AL_INVALID_VALUE */;
            return;
          }
          break;
        case 0x1001 /* AL_CONE_INNER_ANGLE */:
          if (!Number.isFinite(value)) {
            AL.currentCtx.err = 0xA003 /* AL_INVALID_VALUE */;
            return;
          }
  
          src.coneInnerAngle = value;
          if (src.panner) {
            src.panner.coneInnerAngle = value % 360.0;
          }
          break;
        case 0x1002 /* AL_CONE_OUTER_ANGLE */:
          if (!Number.isFinite(value)) {
            AL.currentCtx.err = 0xA003 /* AL_INVALID_VALUE */;
            return;
          }
  
          src.coneOuterAngle = value;
          if (src.panner) {
            src.panner.coneOuterAngle = value % 360.0;
          }
          break;
        case 0x1003 /* AL_PITCH */:
          if (!Number.isFinite(value) || value <= 0.0) {
            AL.currentCtx.err = 0xA003 /* AL_INVALID_VALUE */;
            return;
          }
  
          if (src.pitch === value) {
            break;
          }
  
          src.pitch = value;
          AL.updateSourceRate(src);
          break;
        case 0x1004 /* AL_POSITION */:
          if (!Number.isFinite(value[0]) || !Number.isFinite(value[1]) || !Number.isFinite(value[2])) {
            AL.currentCtx.err = 0xA003 /* AL_INVALID_VALUE */;
            return;
          }
  
          src.position[0] = value[0];
          src.position[1] = value[1];
          src.position[2] = value[2];
          AL.updateSourceSpace(src);
          break;
        case 0x1005 /* AL_DIRECTION */:
          if (!Number.isFinite(value[0]) || !Number.isFinite(value[1]) || !Number.isFinite(value[2])) {
            AL.currentCtx.err = 0xA003 /* AL_INVALID_VALUE */;
            return;
          }
  
          src.direction[0] = value[0];
          src.direction[1] = value[1];
          src.direction[2] = value[2];
          AL.updateSourceSpace(src);
          break;
        case 0x1006 /* AL_VELOCITY */:
          if (!Number.isFinite(value[0]) || !Number.isFinite(value[1]) || !Number.isFinite(value[2])) {
            AL.currentCtx.err = 0xA003 /* AL_INVALID_VALUE */;
            return;
          }
  
          src.velocity[0] = value[0];
          src.velocity[1] = value[1];
          src.velocity[2] = value[2];
          AL.updateSourceSpace(src);
          break;
        case 0x1007 /* AL_LOOPING */:
          if (value === 1 /* AL_TRUE */) {
            src.looping = true;
            AL.updateSourceTime(src);
            if (src.type === 0x1028 /* AL_STATIC */ && src.audioQueue.length > 0) {
              var audioSrc  = src.audioQueue[0];
              audioSrc.loop = true;
              audioSrc._duration = Number.POSITIVE_INFINITY;
            }
          } else if (value === 0 /* AL_FALSE */) {
            src.looping = false;
            var currentTime = AL.updateSourceTime(src);
            if (src.type === 0x1028 /* AL_STATIC */ && src.audioQueue.length > 0) {
              var audioSrc  = src.audioQueue[0];
              audioSrc.loop = false;
              audioSrc._duration = src.bufQueue[0].audioBuf.duration / src.playbackRate;
              audioSrc._startTime = currentTime - src.bufOffset / src.playbackRate;
            }
          } else {
            AL.currentCtx.err = 0xA003 /* AL_INVALID_VALUE */;
            return;
          }
          break;
        case 0x1009 /* AL_BUFFER */:
          if (src.state === 0x1012 /* AL_PLAYING */ || src.state === 0x1013 /* AL_PAUSED */) {
            AL.currentCtx.err = 0xA004 /* AL_INVALID_OPERATION */;
            return;
          }
  
          if (value === 0) {
            for (var i in src.bufQueue) {
              src.bufQueue[i].refCount--;
            }
            src.bufQueue.length = 1;
            src.bufQueue[0] = AL.buffers[0];
  
            src.bufsProcessed = 0;
            src.type = 0x1030 /* AL_UNDETERMINED */;
          } else {
            var buf = AL.buffers[value];
            if (!buf) {
              AL.currentCtx.err = 0xA003 /* AL_INVALID_VALUE */;
              return;
            }
  
            for (var i in src.bufQueue) {
              src.bufQueue[i].refCount--;
            }
            src.bufQueue.length = 0;
  
            buf.refCount++;
            src.bufQueue = [buf];
            src.bufsProcessed = 0;
            src.type = 0x1028 /* AL_STATIC */;
          }
  
          AL.initSourcePanner(src);
          AL.scheduleSourceAudio(src);
          break;
        case 0x100A /* AL_GAIN */:
          if (!Number.isFinite(value) || value < 0.0) {
            AL.currentCtx.err = 0xA003 /* AL_INVALID_VALUE */;
            return;
          }
          src.gain.gain.value = value;
          break;
        case 0x100D /* AL_MIN_GAIN */:
          if (!Number.isFinite(value) || value < 0.0 || value > Math.min(src.maxGain, 1.0)) {
            AL.currentCtx.err = 0xA003 /* AL_INVALID_VALUE */;
            return;
          }
          src.minGain = value;
          break;
        case 0x100E /* AL_MAX_GAIN */:
          if (!Number.isFinite(value) || value < Math.max(0.0, src.minGain) || value > 1.0) {
            AL.currentCtx.err = 0xA003 /* AL_INVALID_VALUE */;
            return;
          }
          src.maxGain = value;
          break;
        case 0x1020 /* AL_REFERENCE_DISTANCE */:
          if (!Number.isFinite(value) || value < 0.0) {
            AL.currentCtx.err = 0xA003 /* AL_INVALID_VALUE */;
            return;
          }
          src.refDistance = value;
          if (src.panner) {
            src.panner.refDistance = value;
          }
          break;
        case 0x1021 /* AL_ROLLOFF_FACTOR */:
          if (!Number.isFinite(value) || value < 0.0) {
            AL.currentCtx.err = 0xA003 /* AL_INVALID_VALUE */;
            return;
          }
          src.rolloffFactor = value;
          if (src.panner) {
            src.panner.rolloffFactor = value;
          }
          break;
        case 0x1022 /* AL_CONE_OUTER_GAIN */:
          if (!Number.isFinite(value) || value < 0.0 || value > 1.0) {
            AL.currentCtx.err = 0xA003 /* AL_INVALID_VALUE */;
            return;
          }
          src.coneOuterGain = value;
          if (src.panner) {
            src.panner.coneOuterGain = value;
          }
          break;
        case 0x1023 /* AL_MAX_DISTANCE */:
          if (!Number.isFinite(value) || value < 0.0) {
            AL.currentCtx.err = 0xA003 /* AL_INVALID_VALUE */;
            return;
          }
          src.maxDistance = value;
          if (src.panner) {
            src.panner.maxDistance = value;
          }
          break;
        case 0x1024 /* AL_SEC_OFFSET */:
          if (value < 0.0 || value > AL.sourceDuration(src)) {
            AL.currentCtx.err = 0xA003 /* AL_INVALID_VALUE */;
            return;
          }
  
          AL.sourceSeek(src, value);
          break;
        case 0x1025 /* AL_SAMPLE_OFFSET */:
          var srcLen = AL.sourceDuration(src);
          if (srcLen > 0.0) {
            var frequency;
            for (var bufId in src.bufQueue) {
              if (bufId !== 0) {
                frequency = src.bufQueue[bufId].frequency;
                break;
              }
            }
            value /= frequency;
          }
          if (value < 0.0 || value > srcLen) {
            AL.currentCtx.err = 0xA003 /* AL_INVALID_VALUE */;
            return;
          }
  
          AL.sourceSeek(src, value);
          break;
        case 0x1026 /* AL_BYTE_OFFSET */:
          var srcLen = AL.sourceDuration(src);
          if (srcLen > 0.0) {
            var bytesPerSec;
            for (var bufId in src.bufQueue) {
              if (bufId !== 0) {
                var buf = src.bufQueue[bufId];
                bytesPerSec = buf.frequency * buf.bytesPerSample * buf.channels;
                break;
              }
            }
            value /= bytesPerSec;
          }
          if (value < 0.0 || value > srcLen) {
            AL.currentCtx.err = 0xA003 /* AL_INVALID_VALUE */;
            return;
          }
  
          AL.sourceSeek(src, value);
          break;
        case 0x1214 /* AL_SOURCE_SPATIALIZE_SOFT */:
          if (value !== 0 /* AL_FALSE */ && value !== 1 /* AL_TRUE */ && value !== 2 /* AL_AUTO_SOFT */) {
            AL.currentCtx.err = 0xA003 /* AL_INVALID_VALUE */;
            return;
          }
  
          src.spatialize = value;
          AL.initSourcePanner(src);
          break;
        case 0x2009 /* AL_BYTE_LENGTH_SOFT */: 
        case 0x200A /* AL_SAMPLE_LENGTH_SOFT */:
        case 0x200B /* AL_SEC_LENGTH_SOFT */:
          AL.currentCtx.err = 0xA004 /* AL_INVALID_OPERATION */;
          break;
        case 0xD000 /* AL_DISTANCE_MODEL */:
          switch (value) {
          case 0 /* AL_NONE */:
          case 0xd001 /* AL_INVERSE_DISTANCE */:
          case 0xd002 /* AL_INVERSE_DISTANCE_CLAMPED */:
          case 0xd003 /* AL_LINEAR_DISTANCE */:
          case 0xd004 /* AL_LINEAR_DISTANCE_CLAMPED */:
          case 0xd005 /* AL_EXPONENT_DISTANCE */:
          case 0xd006 /* AL_EXPONENT_DISTANCE_CLAMPED */:
            src.distanceModel = value;
            if (AL.currentCtx.sourceDistanceModel) {
              AL.updateContextGlobal(AL.currentCtx);
            }
            break;
          default:
            AL.currentCtx.err = 0xA003 /* AL_INVALID_VALUE */;
            return;
          }
          break;
        default:
          AL.currentCtx.err = 0xA002 /* AL_INVALID_ENUM */;
          return;
        }
      },captures:{},sharedCaptureAudioCtx:null,requireValidCaptureDevice:function (deviceId, funcname) {
        if (deviceId === 0) {
          AL.alcErr = 0xA001 /* ALC_INVALID_DEVICE */;
          return null;
        }
        var c = AL.captures[deviceId];
        if (!c) {
          AL.alcErr = 0xA001 /* ALC_INVALID_DEVICE */;
          return null;
        }
        var err = c.mediaStreamError;
        if (err) {
          AL.alcErr = 0xA001 /* ALC_INVALID_DEVICE */;
          return null;
        }
        return c;
      }};function _alBufferData(bufferId, format, pData, size, freq) {
      if (!AL.currentCtx) {
        return;
      }
      var buf = AL.buffers[bufferId];
      if (!buf) {
        AL.currentCtx.err = 0xA003 /* AL_INVALID_VALUE */;
        return;
      }
      if (freq <= 0) {
        AL.currentCtx.err = 0xA003 /* AL_INVALID_VALUE */;
        return;
      }
  
      var audioBuf = null;
      try {
        switch (format) {
        case 0x1100 /* AL_FORMAT_MONO8 */:
          if (size > 0) {
            audioBuf = AL.currentCtx.audioCtx.createBuffer(1, size, freq);
            var channel0 = audioBuf.getChannelData(0);
            for (var i = 0; i < size; ++i) {
              channel0[i] = HEAPU8[pData++] * 0.0078125 /* 1/128 */ - 1.0;
            }
          }
          buf.bytesPerSample = 1;
          buf.channels = 1;
          buf.length = size;
          break;
        case 0x1101 /* AL_FORMAT_MONO16 */:
          if (size > 0) {
            audioBuf = AL.currentCtx.audioCtx.createBuffer(1, size >> 1, freq);
            var channel0 = audioBuf.getChannelData(0);
            pData >>= 1;
            for (var i = 0; i < size >> 1; ++i) {
              channel0[i] = HEAP16[pData++] * 0.000030517578125 /* 1/32768 */;
            }
          }
          buf.bytesPerSample = 2;
          buf.channels = 1;
          buf.length = size >> 1;
          break;
        case 0x1102 /* AL_FORMAT_STEREO8 */:
          if (size > 0) {
            audioBuf = AL.currentCtx.audioCtx.createBuffer(2, size >> 1, freq);
            var channel0 = audioBuf.getChannelData(0);
            var channel1 = audioBuf.getChannelData(1);
            for (var i = 0; i < size >> 1; ++i) {
              channel0[i] = HEAPU8[pData++] * 0.0078125 /* 1/128 */ - 1.0;
              channel1[i] = HEAPU8[pData++] * 0.0078125 /* 1/128 */ - 1.0;
            }
          }
          buf.bytesPerSample = 1;
          buf.channels = 2;
          buf.length = size >> 1;
          break;
        case 0x1103 /* AL_FORMAT_STEREO16 */:
          if (size > 0) {
            audioBuf = AL.currentCtx.audioCtx.createBuffer(2, size >> 2, freq);
            var channel0 = audioBuf.getChannelData(0);
            var channel1 = audioBuf.getChannelData(1);
            pData >>= 1;
            for (var i = 0; i < size >> 2; ++i) {
              channel0[i] = HEAP16[pData++] * 0.000030517578125 /* 1/32768 */;
              channel1[i] = HEAP16[pData++] * 0.000030517578125 /* 1/32768 */;
            }
          }
          buf.bytesPerSample = 2;
          buf.channels = 2;
          buf.length = size >> 2;
          break;
        case 0x10010 /* AL_FORMAT_MONO_FLOAT32 */:
          if (size > 0) {
            audioBuf = AL.currentCtx.audioCtx.createBuffer(1, size >> 2, freq);
            var channel0 = audioBuf.getChannelData(0);
            pData >>= 2;
            for (var i = 0; i < size >> 2; ++i) {
              channel0[i] = HEAPF32[pData++];
            }
          }
          buf.bytesPerSample = 4;
          buf.channels = 1;
          buf.length = size >> 2;
          break;
        case 0x10011 /* AL_FORMAT_STEREO_FLOAT32 */:
          if (size > 0) {
            audioBuf = AL.currentCtx.audioCtx.createBuffer(2, size >> 3, freq);
            var channel0 = audioBuf.getChannelData(0);
            var channel1 = audioBuf.getChannelData(1);
            pData >>= 2;
            for (var i = 0; i < size >> 3; ++i) {
              channel0[i] = HEAPF32[pData++];
              channel1[i] = HEAPF32[pData++];
            }
          }
          buf.bytesPerSample = 4;
          buf.channels = 2;
          buf.length = size >> 3;
          break;
        default:
          AL.currentCtx.err = 0xA003 /* AL_INVALID_VALUE */;
          return;
        }
        buf.frequency = freq;
        buf.audioBuf = audioBuf;
      } catch (e) {
        AL.currentCtx.err = 0xA003 /* AL_INVALID_VALUE */;
        return;
      }
    }

  function _alGenBuffers(count, pBufferIds) {
      if (!AL.currentCtx) {
        return;
      }
  
      for (var i = 0; i < count; ++i) {
        var buf = {
          deviceId: AL.currentCtx.deviceId,
          id: AL.newId(),
          refCount: 0,
          audioBuf: null,
          frequency: 0,
          bytesPerSample: 2,
          channels: 1,
          length: 0,
        };
        AL.deviceRefCounts[buf.deviceId]++;
        AL.buffers[buf.id] = buf;
        HEAP32[(((pBufferIds)+(i*4))>>2)]=buf.id;
      }
    }

  function _alGenSources(count, pSourceIds) {
      if (!AL.currentCtx) {
        return;
      }
      for (var i = 0; i < count; ++i) {
        var gain = AL.currentCtx.audioCtx.createGain();
        gain.connect(AL.currentCtx.gain);
        var src = {
          context: AL.currentCtx,
          id: AL.newId(),
          type: 0x1030 /* AL_UNDETERMINED */,
          state: 0x1011 /* AL_INITIAL */,
          bufQueue: [AL.buffers[0]],
          audioQueue: [],
          looping: false,
          pitch: 1.0,
          dopplerShift: 1.0,
          gain: gain,
          minGain: 0.0,
          maxGain: 1.0,
          panner: null,
          bufsProcessed: 0,
          bufStartTime: Number.NEGATIVE_INFINITY,
          bufOffset: 0.0,
          relative: false,
          refDistance: 1.0,
          maxDistance: 3.40282e38 /* FLT_MAX */,
          rolloffFactor: 1.0,
          position: [0.0, 0.0, 0.0],
          velocity: [0.0, 0.0, 0.0],
          direction: [0.0, 0.0, 0.0],
          coneOuterGain: 0.0,
          coneInnerAngle: 360.0,
          coneOuterAngle: 360.0,
          distanceModel: 0xd002 /* AL_INVERSE_DISTANCE_CLAMPED */,
          spatialize: 2 /* AL_AUTO_SOFT */,
  
          get playbackRate() {
            return this.pitch * this.dopplerShift;
          }
        };
        AL.currentCtx.sources[src.id] = src;
        HEAP32[(((pSourceIds)+(i*4))>>2)]=src.id;
      }
    }

  function _alGetError() {
      if (!AL.currentCtx) {
        return 0xA004 /* AL_INVALID_OPERATION */;
      } else {
        // Reset error on get.
        var err = AL.currentCtx.err;
        AL.currentCtx.err = 0 /* AL_NO_ERROR */;
        return err;
      }
    }

  function _alGetSourcei(sourceId, param, pValue) {
      var val = AL.getSourceParam('alGetSourcei', sourceId, param);
      if (val === null) {
        return;
      }
      if (!pValue) {
        AL.currentCtx.err = 0xA003 /* AL_INVALID_VALUE */;
        return;
      }
  
      switch (param) {
      case 0x202 /* AL_SOURCE_RELATIVE */:
      case 0x1001 /* AL_CONE_INNER_ANGLE */:
      case 0x1002 /* AL_CONE_OUTER_ANGLE */:
      case 0x1007 /* AL_LOOPING */:
      case 0x1009 /* AL_BUFFER */:
      case 0x1010 /* AL_SOURCE_STATE */:
      case 0x1015 /* AL_BUFFERS_QUEUED */:
      case 0x1016 /* AL_BUFFERS_PROCESSED */:
      case 0x1020 /* AL_REFERENCE_DISTANCE */:
      case 0x1021 /* AL_ROLLOFF_FACTOR */:
      case 0x1023 /* AL_MAX_DISTANCE */:
      case 0x1024 /* AL_SEC_OFFSET */:
      case 0x1025 /* AL_SAMPLE_OFFSET */:
      case 0x1026 /* AL_BYTE_OFFSET */:
      case 0x1027 /* AL_SOURCE_TYPE */:
      case 0x1214 /* AL_SOURCE_SPATIALIZE_SOFT */:
      case 0x2009 /* AL_BYTE_LENGTH_SOFT */: 
      case 0x200A /* AL_SAMPLE_LENGTH_SOFT */:
      case 0xD000 /* AL_DISTANCE_MODEL */:
        HEAP32[((pValue)>>2)]=val;
        break;
      default:
        AL.currentCtx.err = 0xA002 /* AL_INVALID_ENUM */;
        return;
      }
    }

  function _alListener3f(param, value0, value1, value2) {
      switch (param) {
      case 0x1004 /* AL_POSITION */:
      case 0x1006 /* AL_VELOCITY */:
        AL.paramArray[0] = value0;
        AL.paramArray[1] = value1;
        AL.paramArray[2] = value2;
        AL.setListenerParam('alListener3f', param, AL.paramArray);
        break;
      default:
        AL.setListenerParam('alListener3f', param, null);
        break;
      }
    }

  function _alListenerf(param, value) {
      switch (param) {
      case 0x100A /* AL_GAIN */:
        AL.setListenerParam('alListenerf', param, value);
        break;
      default:
        AL.setListenerParam('alListenerf', param, null);
        break;
      }
    }

  function _alSourcePlay(sourceId) {
      if (!AL.currentCtx) {
        return;
      }
      var src = AL.currentCtx.sources[sourceId];
      if (!src) {
        AL.currentCtx.err = 0xA001 /* AL_INVALID_NAME */;
        return;
      }
      AL.setSourceState(src, 0x1012 /* AL_PLAYING */);
    }

  function _alSourceQueueBuffers(sourceId, count, pBufferIds) {
      if (!AL.currentCtx) {
        return;
      }
      var src = AL.currentCtx.sources[sourceId];
      if (!src) {
        AL.currentCtx.err = 0xA001 /* AL_INVALID_NAME */;
        return;
      }
      if (src.type === 0x1028 /* AL_STATIC */) {
        AL.currentCtx.err = 0xA004 /* AL_INVALID_OPERATION */;
        return;
      }
  
      if (count === 0) {
        return;
      }
  
      // Find the first non-zero buffer in the queue to determine the proper format
      var templateBuf = AL.buffers[0];
      for (var i = 0; i < src.bufQueue.length; i++) {
        if (src.bufQueue[i].id !== 0) {
          templateBuf = src.bufQueue[i];
          break;
        }
      }
  
      for (var i = 0; i < count; ++i) {
        var bufId = HEAP32[(((pBufferIds)+(i*4))>>2)];
        var buf = AL.buffers[bufId];
        if (!buf) {
          AL.currentCtx.err = 0xA001 /* AL_INVALID_NAME */;
          return;
        }
  
        // Check that the added buffer has the correct format. If the template is the zero buffer, any format is valid.
        if (templateBuf.id !== 0 && (
          buf.frequency !== templateBuf.frequency
          || buf.bytesPerSample !== templateBuf.bytesPerSample
          || buf.channels !== templateBuf.channels)
        ) {
          AL.currentCtx.err = 0xA004 /* AL_INVALID_OPERATION */;
        }
      }
  
      // If the only buffer in the queue is the zero buffer, clear the queue before we add anything.
      if (src.bufQueue.length === 1 && src.bufQueue[0].id === 0) {
        src.bufQueue.length = 0;
      }
  
      src.type = 0x1029 /* AL_STREAMING */;
      for (var i = 0; i < count; ++i) {
        var bufId = HEAP32[(((pBufferIds)+(i*4))>>2)];
        var buf = AL.buffers[bufId];
        buf.refCount++;
        src.bufQueue.push(buf);
      }
  
      // if the source is looping, cancel the schedule so we can reschedule the loop order
      if (src.looping) {
        AL.cancelPendingSourceAudio(src);
      }
  
      AL.initSourcePanner(src);
      AL.scheduleSourceAudio(src);
    }

  function _alSourceStop(sourceId) {
      if (!AL.currentCtx) {
        return;
      }
      var src = AL.currentCtx.sources[sourceId];
      if (!src) {
        AL.currentCtx.err = 0xA001 /* AL_INVALID_NAME */;
        return;
      }
      AL.setSourceState(src, 0x1014 /* AL_STOPPED */);
    }

  function _alSourceUnqueueBuffers(sourceId, count, pBufferIds) {
      if (!AL.currentCtx) {
        return;
      }
      var src = AL.currentCtx.sources[sourceId];
      if (!src) {
        AL.currentCtx.err = 0xA001 /* AL_INVALID_NAME */;
        return;
      }
      if (count > (src.bufQueue.length === 1 && src.bufQueue[0].id === 0 ? 0 : src.bufsProcessed)) {
        AL.currentCtx.err = 0xA003 /* AL_INVALID_VALUE */;
        return;
      }
  
      if (count === 0) {
        return;
      }
  
      for (var i = 0; i < count; i++) {
        var buf = src.bufQueue.shift();
        buf.refCount--;
        // Write the buffers index out to the return list.
        HEAP32[(((pBufferIds)+(i*4))>>2)]=buf.id;
        src.bufsProcessed--;
      }
  
      /// If the queue is empty, put the zero buffer back in
      if (src.bufQueue.length === 0) {
        src.bufQueue.push(AL.buffers[0]);
      }
  
      AL.initSourcePanner(src);
      AL.scheduleSourceAudio(src);
    }

  function _alSourcef(sourceId, param, value) {
      switch (param) {
      case 0x1001 /* AL_CONE_INNER_ANGLE */:
      case 0x1002 /* AL_CONE_OUTER_ANGLE */:
      case 0x1003 /* AL_PITCH */:
      case 0x100A /* AL_GAIN */:
      case 0x100D /* AL_MIN_GAIN */:
      case 0x100E /* AL_MAX_GAIN */:
      case 0x1020 /* AL_REFERENCE_DISTANCE */:
      case 0x1021 /* AL_ROLLOFF_FACTOR */:
      case 0x1022 /* AL_CONE_OUTER_GAIN */:
      case 0x1023 /* AL_MAX_DISTANCE */:
      case 0x1024 /* AL_SEC_OFFSET */:
      case 0x1025 /* AL_SAMPLE_OFFSET */:
      case 0x1026 /* AL_BYTE_OFFSET */:
      case 0x200B /* AL_SEC_LENGTH_SOFT */:
        AL.setSourceParam('alSourcef', sourceId, param, value);
        break;
      default:
        AL.setSourceParam('alSourcef', sourceId, param, null);
        break;
      }
    }

  function _alSourcefv(sourceId, param, pValues) {
      if (!AL.currentCtx) {
        return;
      }
      if (!pValues) {
        AL.currentCtx.err = 0xA003 /* AL_INVALID_VALUE */;
        return;
      }
  
      switch (param) {
      case 0x1001 /* AL_CONE_INNER_ANGLE */:
      case 0x1002 /* AL_CONE_OUTER_ANGLE */:
      case 0x1003 /* AL_PITCH */:
      case 0x100A /* AL_GAIN */:
      case 0x100D /* AL_MIN_GAIN */:
      case 0x100E /* AL_MAX_GAIN */:
      case 0x1020 /* AL_REFERENCE_DISTANCE */:
      case 0x1021 /* AL_ROLLOFF_FACTOR */:
      case 0x1022 /* AL_CONE_OUTER_GAIN */:
      case 0x1023 /* AL_MAX_DISTANCE */:
      case 0x1024 /* AL_SEC_OFFSET */:
      case 0x1025 /* AL_SAMPLE_OFFSET */:
      case 0x1026 /* AL_BYTE_OFFSET */:
      case 0x200B /* AL_SEC_LENGTH_SOFT */:
        var val = HEAPF32[((pValues)>>2)];
        AL.setSourceParam('alSourcefv', sourceId, param, val);
        break;
      case 0x1004 /* AL_POSITION */:
      case 0x1005 /* AL_DIRECTION */:
      case 0x1006 /* AL_VELOCITY */:
        AL.paramArray[0] = HEAPF32[((pValues)>>2)];
        AL.paramArray[1] = HEAPF32[(((pValues)+(4))>>2)];
        AL.paramArray[2] = HEAPF32[(((pValues)+(8))>>2)];
        AL.setSourceParam('alSourcefv', sourceId, param, AL.paramArray);
        break;
      default:
        AL.setSourceParam('alSourcefv', sourceId, param, null);
        break;
      }
    }

  function _alcCreateContext(deviceId, pAttrList) {
      if (!(deviceId in AL.deviceRefCounts)) {
        AL.alcErr = 0xA001; /* ALC_INVALID_DEVICE */
        return 0;
      }
  
      var options = null;
      var attrs = [];
      var hrtf = null;
      pAttrList >>= 2;
      if (pAttrList) {
        var attr = 0;
        var val = 0;
        while (true) {
          attr = HEAP32[pAttrList++];
          attrs.push(attr);
          if (attr === 0) {
            break;
          }
          val = HEAP32[pAttrList++];
          attrs.push(val);
  
          switch (attr) {
          case 0x1007 /* ALC_FREQUENCY */:
            if (!options) {
              options = {};
            }
  
            options.sampleRate = val;
            break;
          case 0x1010 /* ALC_MONO_SOURCES */: // fallthrough
          case 0x1011 /* ALC_STEREO_SOURCES */:
            // Do nothing; these hints are satisfied by default
            break
          case 0x1992 /* ALC_HRTF_SOFT */:
            switch (val) {
              case 0 /* ALC_FALSE */:
                hrtf = false;
                break;
              case 1 /* ALC_TRUE */:
                hrtf = true;
                break;
              case 2 /* ALC_DONT_CARE_SOFT */:
                break;
              default:
                AL.alcErr = 0xA004 /* ALC_INVALID_VALUE */;
                return 0;
            }
            break;
          case 0x1996 /* ALC_HRTF_ID_SOFT */:
            if (val !== 0) {
              AL.alcErr = 0xA004 /* ALC_INVALID_VALUE */;
              return 0;
            }
            break;
          default:
            AL.alcErr = 0xA004; /* ALC_INVALID_VALUE */
            return 0;
          }
        }
      }
  
      var AudioContext = window.AudioContext || window.webkitAudioContext;
      var ac = null;
      try {
        // Only try to pass options if there are any, for compat with browsers that don't support this
        if (options) {
          ac = new AudioContext(options);
        } else {
          ac = new AudioContext();
        }
      } catch (e) {
        if (e.name === 'NotSupportedError') {
          AL.alcErr = 0xA004; /* ALC_INVALID_VALUE */
        } else {
          AL.alcErr = 0xA001; /* ALC_INVALID_DEVICE */
        }
  
        return 0;
      }
  
      // Old Web Audio API (e.g. Safari 6.0.5) had an inconsistently named createGainNode function.
      if (typeof(ac.createGain) === 'undefined') {
        ac.createGain = ac.createGainNode;
      }
  
      var gain = ac.createGain();
      gain.connect(ac.destination);
      var ctx = {
        deviceId: deviceId,
        id: AL.newId(),
        attrs: attrs,
        audioCtx: ac,
        listener: {
      	  position: [0.0, 0.0, 0.0],
      	  velocity: [0.0, 0.0, 0.0],
      	  direction: [0.0, 0.0, 0.0],
      	  up: [0.0, 0.0, 0.0]
        },
        sources: [],
        interval: setInterval(function() { AL.scheduleContextAudio(ctx); }, AL.QUEUE_INTERVAL),
        gain: gain,
        distanceModel: 0xd002 /* AL_INVERSE_DISTANCE_CLAMPED */,
        speedOfSound: 343.3,
        dopplerFactor: 1.0,
        sourceDistanceModel: false,
        hrtf: hrtf || false,
  
        _err: 0,
        get err() {
          return this._err;
        },
        set err(val) {
          // Errors should not be overwritten by later errors until they are cleared by a query.
          if (this._err === 0 /* AL_NO_ERROR */ || val === 0 /* AL_NO_ERROR */) {
            this._err = val;
          }
        }
      };
      AL.deviceRefCounts[deviceId]++;
      AL.contexts[ctx.id] = ctx;
  
      if (hrtf !== null) {
        // Apply hrtf attrib to all contexts for this device
        for (var ctxId in AL.contexts) {
          var c = AL.contexts[ctxId];
          if (c.deviceId === deviceId) {
            c.hrtf = hrtf;
            AL.updateContextGlobal(c);
          }
        }
      }
  
      return ctx.id;
    }

  function _alcMakeContextCurrent(contextId) {
      if (contextId === 0) {
        AL.currentCtx = null;
        return 0;
      } else {
        AL.currentCtx = AL.contexts[contextId];
        return 1;
      }
    }

  function _alcOpenDevice(pDeviceName) {
      if (pDeviceName) {
        var name = UTF8ToString(pDeviceName);
        if (name !== AL.DEVICE_NAME) {
          return 0;
        }
      }
  
      if (typeof(AudioContext) !== 'undefined' || typeof(webkitAudioContext) !== 'undefined') {
        var deviceId = AL.newId();
        AL.deviceRefCounts[deviceId] = 0;
        return deviceId;
      } else {
        return 0;
      }
    }

  
  var ___tm_formatted=4306544;
  
  
  
  function _tzset() {
      // TODO: Use (malleable) environment variables instead of system settings.
      if (_tzset.called) return;
      _tzset.called = true;
  
      // timezone is specified as seconds west of UTC ("The external variable
      // `timezone` shall be set to the difference, in seconds, between
      // Coordinated Universal Time (UTC) and local standard time."), the same
      // as returned by getTimezoneOffset().
      // See http://pubs.opengroup.org/onlinepubs/009695399/functions/tzset.html
      HEAP32[((__get_timezone())>>2)]=(new Date()).getTimezoneOffset() * 60;
  
      var winter = new Date(2000, 0, 1);
      var summer = new Date(2000, 6, 1);
      HEAP32[((__get_daylight())>>2)]=Number(winter.getTimezoneOffset() != summer.getTimezoneOffset());
  
      function extractZone(date) {
        var match = date.toTimeString().match(/\(([A-Za-z ]+)\)$/);
        return match ? match[1] : "GMT";
      };
      var winterName = extractZone(winter);
      var summerName = extractZone(summer);
      var winterNamePtr = allocate(intArrayFromString(winterName), 'i8', ALLOC_NORMAL);
      var summerNamePtr = allocate(intArrayFromString(summerName), 'i8', ALLOC_NORMAL);
      if (summer.getTimezoneOffset() < winter.getTimezoneOffset()) {
        // Northern hemisphere
        HEAP32[((__get_tzname())>>2)]=winterNamePtr;
        HEAP32[(((__get_tzname())+(4))>>2)]=summerNamePtr;
      } else {
        HEAP32[((__get_tzname())>>2)]=summerNamePtr;
        HEAP32[(((__get_tzname())+(4))>>2)]=winterNamePtr;
      }
    }function _mktime(tmPtr) {
      _tzset();
      var date = new Date(HEAP32[(((tmPtr)+(20))>>2)] + 1900,
                          HEAP32[(((tmPtr)+(16))>>2)],
                          HEAP32[(((tmPtr)+(12))>>2)],
                          HEAP32[(((tmPtr)+(8))>>2)],
                          HEAP32[(((tmPtr)+(4))>>2)],
                          HEAP32[((tmPtr)>>2)],
                          0);
  
      // There's an ambiguous hour when the time goes back; the tm_isdst field is
      // used to disambiguate it.  Date() basically guesses, so we fix it up if it
      // guessed wrong, or fill in tm_isdst with the guess if it's -1.
      var dst = HEAP32[(((tmPtr)+(32))>>2)];
      var guessedOffset = date.getTimezoneOffset();
      var start = new Date(date.getFullYear(), 0, 1);
      var summerOffset = new Date(2000, 6, 1).getTimezoneOffset();
      var winterOffset = start.getTimezoneOffset();
      var dstOffset = Math.min(winterOffset, summerOffset); // DST is in December in South
      if (dst < 0) {
        // Attention: some regions don't have DST at all.
        HEAP32[(((tmPtr)+(32))>>2)]=Number(summerOffset != winterOffset && dstOffset == guessedOffset);
      } else if ((dst > 0) != (dstOffset == guessedOffset)) {
        var nonDstOffset = Math.max(winterOffset, summerOffset);
        var trueOffset = dst > 0 ? dstOffset : nonDstOffset;
        // Don't try setMinutes(date.getMinutes() + ...) -- it's messed up.
        date.setTime(date.getTime() + (trueOffset - guessedOffset)*60000);
      }
  
      HEAP32[(((tmPtr)+(24))>>2)]=date.getDay();
      var yday = ((date.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))|0;
      HEAP32[(((tmPtr)+(28))>>2)]=yday;
  
      return (date.getTime() / 1000)|0;
    }function _asctime_r(tmPtr, buf) {
      var date = {
        tm_sec: HEAP32[((tmPtr)>>2)],
        tm_min: HEAP32[(((tmPtr)+(4))>>2)],
        tm_hour: HEAP32[(((tmPtr)+(8))>>2)],
        tm_mday: HEAP32[(((tmPtr)+(12))>>2)],
        tm_mon: HEAP32[(((tmPtr)+(16))>>2)],
        tm_year: HEAP32[(((tmPtr)+(20))>>2)],
        tm_wday: HEAP32[(((tmPtr)+(24))>>2)]
      };
      var days = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ];
      var months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
      var s = days[date.tm_wday] + ' ' + months[date.tm_mon] +
          (date.tm_mday < 10 ? '  ' : ' ') + date.tm_mday +
          (date.tm_hour < 10 ? ' 0' : ' ') + date.tm_hour +
          (date.tm_min < 10 ? ':0' : ':') + date.tm_min +
          (date.tm_sec < 10 ? ':0' : ':') + date.tm_sec +
          ' ' + (1900 + date.tm_year) + "\n";
  
      // asctime_r is specced to behave in an undefined manner if the algorithm would attempt
      // to write out more than 26 bytes (including the null terminator).
      // See http://pubs.opengroup.org/onlinepubs/9699919799/functions/asctime.html
      // Our undefined behavior is to truncate the write to at most 26 bytes, including null terminator.
      stringToUTF8(s, buf, 26);
      return buf;
    }function _asctime(tmPtr) {
      return _asctime_r(tmPtr, ___tm_formatted);
    }

  function _atexit(func, arg) {
      warnOnce('atexit() called, but EXIT_RUNTIME is not set, so atexits() will not be called. set EXIT_RUNTIME to 1 (see the FAQ)');
      __ATEXIT__.unshift({ func: func, arg: arg });
    }

  function _clock() {
      if (_clock.start === undefined) _clock.start = Date.now();
      return ((Date.now() - _clock.start) * (1000000 / 1000))|0;
    }

  
  function _emscripten_get_now_is_monotonic() {
      // return whether emscripten_get_now is guaranteed monotonic; the Date.now
      // implementation is not :(
      return (0
        || ENVIRONMENT_IS_NODE
        || (typeof dateNow !== 'undefined')
        || (typeof performance === 'object' && performance && typeof performance['now'] === 'function')
        );
    }function _clock_gettime(clk_id, tp) {
      // int clock_gettime(clockid_t clk_id, struct timespec *tp);
      var now;
      if (clk_id === 0) {
        now = Date.now();
      } else if (clk_id === 1 && _emscripten_get_now_is_monotonic()) {
        now = _emscripten_get_now();
      } else {
        ___setErrNo(22);
        return -1;
      }
      HEAP32[((tp)>>2)]=(now/1000)|0; // seconds
      HEAP32[(((tp)+(4))>>2)]=((now % 1000)*1000*1000)|0; // nanoseconds
      return 0;
    }

  
  function _dlopen(/* ... */) {
      abort("To use dlopen, you need to use Emscripten's linking support, see https://github.com/emscripten-core/emscripten/wiki/Linking");
    }function _dlclose() {
  return _dlopen.apply(null, arguments)
  }

  function _dlerror() {
  return _dlopen.apply(null, arguments)
  }

  function _dlsym() {
  return _dlopen.apply(null, arguments)
  }

  
  var EGL={errorCode:12288,defaultDisplayInitialized:false,currentContext:0,currentReadSurface:0,currentDrawSurface:0,contextAttributes:{alpha:false,depth:false,stencil:false,antialias:false},stringCache:{},setErrorCode:function (code) {
        EGL.errorCode = code;
      },chooseConfig:function (display, attribList, config, config_size, numConfigs) {
        if (display != 62000 /* Magic ID for Emscripten 'default display' */) {
          EGL.setErrorCode(0x3008 /* EGL_BAD_DISPLAY */);
          return 0;
        }
  
        if (attribList) {
          // read attribList if it is non-null
          for(;;) {
            var param = HEAP32[((attribList)>>2)];
            if (param == 0x3021 /*EGL_ALPHA_SIZE*/) {
              var alphaSize = HEAP32[(((attribList)+(4))>>2)];
              EGL.contextAttributes.alpha = (alphaSize > 0);
            } else if (param == 0x3025 /*EGL_DEPTH_SIZE*/) {
              var depthSize = HEAP32[(((attribList)+(4))>>2)];
              EGL.contextAttributes.depth = (depthSize > 0);
            } else if (param == 0x3026 /*EGL_STENCIL_SIZE*/) {
              var stencilSize = HEAP32[(((attribList)+(4))>>2)];
              EGL.contextAttributes.stencil = (stencilSize > 0);
            } else if (param == 0x3031 /*EGL_SAMPLES*/) {
              var samples = HEAP32[(((attribList)+(4))>>2)];
              EGL.contextAttributes.antialias = (samples > 0);
            } else if (param == 0x3032 /*EGL_SAMPLE_BUFFERS*/) {
              var samples = HEAP32[(((attribList)+(4))>>2)];
              EGL.contextAttributes.antialias = (samples == 1);
            } else if (param == 0x3100 /*EGL_CONTEXT_PRIORITY_LEVEL_IMG*/) {
              var requestedPriority = HEAP32[(((attribList)+(4))>>2)];
              EGL.contextAttributes.lowLatency = (requestedPriority != 0x3103 /*EGL_CONTEXT_PRIORITY_LOW_IMG*/);
            } else if (param == 0x3038 /*EGL_NONE*/) {
                break;
            }
            attribList += 8;
          }
        }
  
        if ((!config || !config_size) && !numConfigs) {
          EGL.setErrorCode(0x300C /* EGL_BAD_PARAMETER */);
          return 0;
        }
        if (numConfigs) {
          HEAP32[((numConfigs)>>2)]=1; // Total number of supported configs: 1.
        }
        if (config && config_size > 0) {
          HEAP32[((config)>>2)]=62002;
        }
  
        EGL.setErrorCode(0x3000 /* EGL_SUCCESS */);
        return 1;
      }};function _eglBindAPI(api) {
      if (api == 0x30A0 /* EGL_OPENGL_ES_API */) {
        EGL.setErrorCode(0x3000 /* EGL_SUCCESS */);
        return 1;
      } else { // if (api == 0x30A1 /* EGL_OPENVG_API */ || api == 0x30A2 /* EGL_OPENGL_API */) {
        EGL.setErrorCode(0x300C /* EGL_BAD_PARAMETER */);
        return 0;
      }
    }

  function _eglChooseConfig(display, attrib_list, configs, config_size, numConfigs) {
      return EGL.chooseConfig(display, attrib_list, configs, config_size, numConfigs);
    }

  
  var GL={counter:1,lastError:0,buffers:[],mappedBuffers:{},programs:[],framebuffers:[],renderbuffers:[],textures:[],uniforms:[],shaders:[],vaos:[],contexts:{},currentContext:null,offscreenCanvases:{},timerQueriesEXT:[],programInfos:{},stringCache:{},unpackAlignment:4,init:function () {
        GL.miniTempBuffer = new Float32Array(GL.MINI_TEMP_BUFFER_SIZE);
        for (var i = 0; i < GL.MINI_TEMP_BUFFER_SIZE; i++) {
          GL.miniTempBufferViews[i] = GL.miniTempBuffer.subarray(0, i+1);
        }
      },recordError:function recordError(errorCode) {
        if (!GL.lastError) {
          GL.lastError = errorCode;
        }
      },getNewId:function (table) {
        var ret = GL.counter++;
        for (var i = table.length; i < ret; i++) {
          table[i] = null;
        }
        return ret;
      },MINI_TEMP_BUFFER_SIZE:256,miniTempBuffer:null,miniTempBufferViews:[0],getSource:function (shader, count, string, length) {
        var source = '';
        for (var i = 0; i < count; ++i) {
          var len = length ? HEAP32[(((length)+(i*4))>>2)] : -1;
          source += UTF8ToString(HEAP32[(((string)+(i*4))>>2)], len < 0 ? undefined : len);
        }
        return source;
      },createContext:function (canvas, webGLContextAttributes) {
  
  
  
  
        var ctx = 
          (canvas.getContext("webgl", webGLContextAttributes) || canvas.getContext("experimental-webgl", webGLContextAttributes));
  
  
        return ctx && GL.registerContext(ctx, webGLContextAttributes);
      },registerContext:function (ctx, webGLContextAttributes) {
        var handle = _malloc(8); // Make space on the heap to store GL context attributes that need to be accessible as shared between threads.
        var context = {
          handle: handle,
          attributes: webGLContextAttributes,
          version: webGLContextAttributes.majorVersion,
          GLctx: ctx
        };
  
  
  
        // Store the created context object so that we can access the context given a canvas without having to pass the parameters again.
        if (ctx.canvas) ctx.canvas.GLctxObject = context;
        GL.contexts[handle] = context;
        if (typeof webGLContextAttributes.enableExtensionsByDefault === 'undefined' || webGLContextAttributes.enableExtensionsByDefault) {
          GL.initExtensions(context);
        }
  
  
  
  
        return handle;
      },makeContextCurrent:function (contextHandle) {
  
        GL.currentContext = GL.contexts[contextHandle]; // Active Emscripten GL layer context object.
        Module.ctx = GLctx = GL.currentContext && GL.currentContext.GLctx; // Active WebGL context object.
        return !(contextHandle && !GLctx);
      },getContext:function (contextHandle) {
        return GL.contexts[contextHandle];
      },deleteContext:function (contextHandle) {
        if (GL.currentContext === GL.contexts[contextHandle]) GL.currentContext = null;
        if (typeof JSEvents === 'object') JSEvents.removeAllHandlersOnTarget(GL.contexts[contextHandle].GLctx.canvas); // Release all JS event handlers on the DOM element that the GL context is associated with since the context is now deleted.
        if (GL.contexts[contextHandle] && GL.contexts[contextHandle].GLctx.canvas) GL.contexts[contextHandle].GLctx.canvas.GLctxObject = undefined; // Make sure the canvas object no longer refers to the context object so there are no GC surprises.
        _free(GL.contexts[contextHandle]);
        GL.contexts[contextHandle] = null;
      },initExtensions:function (context) {
        // If this function is called without a specific context object, init the extensions of the currently active context.
        if (!context) context = GL.currentContext;
  
        if (context.initExtensionsDone) return;
        context.initExtensionsDone = true;
  
        var GLctx = context.GLctx;
  
        // Detect the presence of a few extensions manually, this GL interop layer itself will need to know if they exist.
  
        if (context.version < 2) {
          // Extension available from Firefox 26 and Google Chrome 30
          var instancedArraysExt = GLctx.getExtension('ANGLE_instanced_arrays');
          if (instancedArraysExt) {
            GLctx['vertexAttribDivisor'] = function(index, divisor) { instancedArraysExt['vertexAttribDivisorANGLE'](index, divisor); };
            GLctx['drawArraysInstanced'] = function(mode, first, count, primcount) { instancedArraysExt['drawArraysInstancedANGLE'](mode, first, count, primcount); };
            GLctx['drawElementsInstanced'] = function(mode, count, type, indices, primcount) { instancedArraysExt['drawElementsInstancedANGLE'](mode, count, type, indices, primcount); };
          }
  
          // Extension available from Firefox 25 and WebKit
          var vaoExt = GLctx.getExtension('OES_vertex_array_object');
          if (vaoExt) {
            GLctx['createVertexArray'] = function() { return vaoExt['createVertexArrayOES'](); };
            GLctx['deleteVertexArray'] = function(vao) { vaoExt['deleteVertexArrayOES'](vao); };
            GLctx['bindVertexArray'] = function(vao) { vaoExt['bindVertexArrayOES'](vao); };
            GLctx['isVertexArray'] = function(vao) { return vaoExt['isVertexArrayOES'](vao); };
          }
  
          var drawBuffersExt = GLctx.getExtension('WEBGL_draw_buffers');
          if (drawBuffersExt) {
            GLctx['drawBuffers'] = function(n, bufs) { drawBuffersExt['drawBuffersWEBGL'](n, bufs); };
          }
        }
  
        GLctx.disjointTimerQueryExt = GLctx.getExtension("EXT_disjoint_timer_query");
  
        // These are the 'safe' feature-enabling extensions that don't add any performance impact related to e.g. debugging, and
        // should be enabled by default so that client GLES2/GL code will not need to go through extra hoops to get its stuff working.
        // As new extensions are ratified at http://www.khronos.org/registry/webgl/extensions/ , feel free to add your new extensions
        // here, as long as they don't produce a performance impact for users that might not be using those extensions.
        // E.g. debugging-related extensions should probably be off by default.
        var automaticallyEnabledExtensions = [ // Khronos ratified WebGL extensions ordered by number (no debug extensions):
                                               "OES_texture_float", "OES_texture_half_float", "OES_standard_derivatives",
                                               "OES_vertex_array_object", "WEBGL_compressed_texture_s3tc", "WEBGL_depth_texture",
                                               "OES_element_index_uint", "EXT_texture_filter_anisotropic", "EXT_frag_depth",
                                               "WEBGL_draw_buffers", "ANGLE_instanced_arrays", "OES_texture_float_linear",
                                               "OES_texture_half_float_linear", "EXT_blend_minmax", "EXT_shader_texture_lod",
                                               // Community approved WebGL extensions ordered by number:
                                               "WEBGL_compressed_texture_pvrtc", "EXT_color_buffer_half_float", "WEBGL_color_buffer_float",
                                               "EXT_sRGB", "WEBGL_compressed_texture_etc1", "EXT_disjoint_timer_query",
                                               "WEBGL_compressed_texture_etc", "WEBGL_compressed_texture_astc", "EXT_color_buffer_float",
                                               "WEBGL_compressed_texture_s3tc_srgb", "EXT_disjoint_timer_query_webgl2"];
  
        function shouldEnableAutomatically(extension) {
          var ret = false;
          automaticallyEnabledExtensions.forEach(function(include) {
            if (extension.indexOf(include) != -1) {
              ret = true;
            }
          });
          return ret;
        }
  
        var exts = GLctx.getSupportedExtensions();
        if (exts && exts.length > 0) {
          GLctx.getSupportedExtensions().forEach(function(ext) {
            if (automaticallyEnabledExtensions.indexOf(ext) != -1) {
              GLctx.getExtension(ext); // Calling .getExtension enables that extension permanently, no need to store the return value to be enabled.
            }
          });
        }
      },populateUniformTable:function (program) {
        var p = GL.programs[program];
        var ptable = GL.programInfos[program] = {
          uniforms: {},
          maxUniformLength: 0, // This is eagerly computed below, since we already enumerate all uniforms anyway.
          maxAttributeLength: -1, // This is lazily computed and cached, computed when/if first asked, "-1" meaning not computed yet.
          maxUniformBlockNameLength: -1 // Lazily computed as well
        };
  
        var utable = ptable.uniforms;
        // A program's uniform table maps the string name of an uniform to an integer location of that uniform.
        // The global GL.uniforms map maps integer locations to WebGLUniformLocations.
        var numUniforms = GLctx.getProgramParameter(p, 0x8B86/*GL_ACTIVE_UNIFORMS*/);
        for (var i = 0; i < numUniforms; ++i) {
          var u = GLctx.getActiveUniform(p, i);
  
          var name = u.name;
          ptable.maxUniformLength = Math.max(ptable.maxUniformLength, name.length+1);
  
          // If we are dealing with an array, e.g. vec4 foo[3], strip off the array index part to canonicalize that "foo", "foo[]",
          // and "foo[0]" will mean the same. Loop below will populate foo[1] and foo[2].
          if (name.slice(-1) == ']') {
            name = name.slice(0, name.lastIndexOf('['));
          }
  
          // Optimize memory usage slightly: If we have an array of uniforms, e.g. 'vec3 colors[3];', then
          // only store the string 'colors' in utable, and 'colors[0]', 'colors[1]' and 'colors[2]' will be parsed as 'colors'+i.
          // Note that for the GL.uniforms table, we still need to fetch the all WebGLUniformLocations for all the indices.
          var loc = GLctx.getUniformLocation(p, name);
          if (loc) {
            var id = GL.getNewId(GL.uniforms);
            utable[name] = [u.size, id];
            GL.uniforms[id] = loc;
  
            for (var j = 1; j < u.size; ++j) {
              var n = name + '['+j+']';
              loc = GLctx.getUniformLocation(p, n);
              id = GL.getNewId(GL.uniforms);
  
              GL.uniforms[id] = loc;
            }
          }
        }
      }};function _eglCreateContext(display, config, hmm, contextAttribs) {
      if (display != 62000 /* Magic ID for Emscripten 'default display' */) {
        EGL.setErrorCode(0x3008 /* EGL_BAD_DISPLAY */);
        return 0;
      }
  
      // EGL 1.4 spec says default EGL_CONTEXT_CLIENT_VERSION is GLES1, but this is not supported by Emscripten.
      // So user must pass EGL_CONTEXT_CLIENT_VERSION == 2 to initialize EGL.
      var glesContextVersion = 1;
      for(;;) {
        var param = HEAP32[((contextAttribs)>>2)];
        if (param == 0x3098 /*EGL_CONTEXT_CLIENT_VERSION*/) {
          glesContextVersion = HEAP32[(((contextAttribs)+(4))>>2)];
        } else if (param == 0x3038 /*EGL_NONE*/) {
          break;
        } else {
          /* EGL1.4 specifies only EGL_CONTEXT_CLIENT_VERSION as supported attribute */
          EGL.setErrorCode(0x3004 /*EGL_BAD_ATTRIBUTE*/);
          return 0;
        }
        contextAttribs += 8;
      }
      if (glesContextVersion != 2) {
        EGL.setErrorCode(0x3005 /* EGL_BAD_CONFIG */);
        return 0; /* EGL_NO_CONTEXT */
      }
  
      EGL.contextAttributes.majorVersion = glesContextVersion - 1; // WebGL 1 is GLES 2, WebGL2 is GLES3
      EGL.contextAttributes.minorVersion = 0;
  
      EGL.context = GL.createContext(Module['canvas'], EGL.contextAttributes);
  
      if (EGL.context != 0) {
        EGL.setErrorCode(0x3000 /* EGL_SUCCESS */);
  
        // Run callbacks so that GL emulation works
        GL.makeContextCurrent(EGL.context);
        Module.useWebGL = true;
        Browser.moduleContextCreatedCallbacks.forEach(function(callback) { callback() });
  
        // Note: This function only creates a context, but it shall not make it active.
        GL.makeContextCurrent(null);
        return 62004; // Magic ID for Emscripten EGLContext
      } else {
        EGL.setErrorCode(0x3009 /* EGL_BAD_MATCH */); // By the EGL 1.4 spec, an implementation that does not support GLES2 (WebGL in this case), this error code is set.
        return 0; /* EGL_NO_CONTEXT */
      }
    }

  function _eglCreateWindowSurface(display, config, win, attrib_list) {
      if (display != 62000 /* Magic ID for Emscripten 'default display' */) {
        EGL.setErrorCode(0x3008 /* EGL_BAD_DISPLAY */);
        return 0;
      }
      if (config != 62002 /* Magic ID for the only EGLConfig supported by Emscripten */) {
        EGL.setErrorCode(0x3005 /* EGL_BAD_CONFIG */);
        return 0;
      }
      // TODO: Examine attrib_list! Parameters that can be present there are:
      // - EGL_RENDER_BUFFER (must be EGL_BACK_BUFFER)
      // - EGL_VG_COLORSPACE (can't be set)
      // - EGL_VG_ALPHA_FORMAT (can't be set)
      EGL.setErrorCode(0x3000 /* EGL_SUCCESS */);
      return 62006; /* Magic ID for Emscripten 'default surface' */
    }

  function _eglDestroyContext(display, context) {
      if (display != 62000 /* Magic ID for Emscripten 'default display' */) {
        EGL.setErrorCode(0x3008 /* EGL_BAD_DISPLAY */);
        return 0;
      }
  
      if (context != 62004 /* Magic ID for Emscripten EGLContext */) {
        EGL.setErrorCode(0x3006 /* EGL_BAD_CONTEXT */);
        return 0;
      }
  
      EGL.setErrorCode(0x3000 /* EGL_SUCCESS */);
      return 1;
    }

  function _eglDestroySurface(display, surface) {
      if (display != 62000 /* Magic ID for Emscripten 'default display' */) {
        EGL.setErrorCode(0x3008 /* EGL_BAD_DISPLAY */);
        return 0;
      }
      if (surface != 62006 /* Magic ID for the only EGLSurface supported by Emscripten */) {
        EGL.setErrorCode(0x300D /* EGL_BAD_SURFACE */);
        return 1;
      }
      if (EGL.currentReadSurface == surface) {
        EGL.currentReadSurface = 0;
      }
      if (EGL.currentDrawSurface == surface) {
        EGL.currentDrawSurface = 0;
      }
      EGL.setErrorCode(0x3000 /* EGL_SUCCESS */);
      return 1; /* Magic ID for Emscripten 'default surface' */
    }

  function _eglGetConfigAttrib(display, config, attribute, value) {
      if (display != 62000 /* Magic ID for Emscripten 'default display' */) {
        EGL.setErrorCode(0x3008 /* EGL_BAD_DISPLAY */);
        return 0;
      }
      if (config != 62002 /* Magic ID for the only EGLConfig supported by Emscripten */) {
        EGL.setErrorCode(0x3005 /* EGL_BAD_CONFIG */);
        return 0;
      }
      if (!value) {
        EGL.setErrorCode(0x300C /* EGL_BAD_PARAMETER */);
        return 0;
      }
      EGL.setErrorCode(0x3000 /* EGL_SUCCESS */);
      switch(attribute) {
      case 0x3020: // EGL_BUFFER_SIZE
        HEAP32[((value)>>2)]=EGL.contextAttributes.alpha ? 32 : 24;
        return 1;
      case 0x3021: // EGL_ALPHA_SIZE
        HEAP32[((value)>>2)]=EGL.contextAttributes.alpha ? 8 : 0;
        return 1;
      case 0x3022: // EGL_BLUE_SIZE
        HEAP32[((value)>>2)]=8;
        return 1;
      case 0x3023: // EGL_GREEN_SIZE
        HEAP32[((value)>>2)]=8;
        return 1;
      case 0x3024: // EGL_RED_SIZE
        HEAP32[((value)>>2)]=8;
        return 1;
      case 0x3025: // EGL_DEPTH_SIZE
        HEAP32[((value)>>2)]=EGL.contextAttributes.depth ? 24 : 0;
        return 1;
      case 0x3026: // EGL_STENCIL_SIZE
        HEAP32[((value)>>2)]=EGL.contextAttributes.stencil ? 8 : 0;
        return 1;
      case 0x3027: // EGL_CONFIG_CAVEAT
        // We can return here one of EGL_NONE (0x3038), EGL_SLOW_CONFIG (0x3050) or EGL_NON_CONFORMANT_CONFIG (0x3051).
        HEAP32[((value)>>2)]=0x3038;
        return 1;
      case 0x3028: // EGL_CONFIG_ID
        HEAP32[((value)>>2)]=62002;
        return 1;
      case 0x3029: // EGL_LEVEL
        HEAP32[((value)>>2)]=0;
        return 1;
      case 0x302A: // EGL_MAX_PBUFFER_HEIGHT
        HEAP32[((value)>>2)]=4096;
        return 1;
      case 0x302B: // EGL_MAX_PBUFFER_PIXELS
        HEAP32[((value)>>2)]=16777216;
        return 1;
      case 0x302C: // EGL_MAX_PBUFFER_WIDTH
        HEAP32[((value)>>2)]=4096;
        return 1;
      case 0x302D: // EGL_NATIVE_RENDERABLE
        HEAP32[((value)>>2)]=0;
        return 1;
      case 0x302E: // EGL_NATIVE_VISUAL_ID
        HEAP32[((value)>>2)]=0;
        return 1;
      case 0x302F: // EGL_NATIVE_VISUAL_TYPE
        HEAP32[((value)>>2)]=0x3038;
        return 1;
      case 0x3031: // EGL_SAMPLES
        HEAP32[((value)>>2)]=EGL.contextAttributes.antialias ? 4 : 0;
        return 1;
      case 0x3032: // EGL_SAMPLE_BUFFERS
        HEAP32[((value)>>2)]=EGL.contextAttributes.antialias ? 1 : 0;
        return 1;
      case 0x3033: // EGL_SURFACE_TYPE
        HEAP32[((value)>>2)]=0x0004;
        return 1;
      case 0x3034: // EGL_TRANSPARENT_TYPE
        // If this returns EGL_TRANSPARENT_RGB (0x3052), transparency is used through color-keying. No such thing applies to Emscripten canvas.
        HEAP32[((value)>>2)]=0x3038;
        return 1;
      case 0x3035: // EGL_TRANSPARENT_BLUE_VALUE
      case 0x3036: // EGL_TRANSPARENT_GREEN_VALUE
      case 0x3037: // EGL_TRANSPARENT_RED_VALUE
        // "If EGL_TRANSPARENT_TYPE is EGL_NONE, then the values for EGL_TRANSPARENT_RED_VALUE, EGL_TRANSPARENT_GREEN_VALUE, and EGL_TRANSPARENT_BLUE_VALUE are undefined."
        HEAP32[((value)>>2)]=-1;
        return 1;
      case 0x3039: // EGL_BIND_TO_TEXTURE_RGB
      case 0x303A: // EGL_BIND_TO_TEXTURE_RGBA
        HEAP32[((value)>>2)]=0;
        return 1;
      case 0x303B: // EGL_MIN_SWAP_INTERVAL
        HEAP32[((value)>>2)]=0;
        return 1;
      case 0x303C: // EGL_MAX_SWAP_INTERVAL
        HEAP32[((value)>>2)]=1;
        return 1;
      case 0x303D: // EGL_LUMINANCE_SIZE
      case 0x303E: // EGL_ALPHA_MASK_SIZE
        HEAP32[((value)>>2)]=0;
        return 1;
      case 0x303F: // EGL_COLOR_BUFFER_TYPE
        // EGL has two types of buffers: EGL_RGB_BUFFER and EGL_LUMINANCE_BUFFER.
        HEAP32[((value)>>2)]=0x308E;
        return 1;
      case 0x3040: // EGL_RENDERABLE_TYPE
        // A bit combination of EGL_OPENGL_ES_BIT,EGL_OPENVG_BIT,EGL_OPENGL_ES2_BIT and EGL_OPENGL_BIT.
        HEAP32[((value)>>2)]=0x0004;
        return 1;
      case 0x3042: // EGL_CONFORMANT
        // "EGL_CONFORMANT is a mask indicating if a client API context created with respect to the corresponding EGLConfig will pass the required conformance tests for that API."
        HEAP32[((value)>>2)]=0;
        return 1;
      default:
        EGL.setErrorCode(0x3004 /* EGL_BAD_ATTRIBUTE */);
        return 0;
      }
    }

  function _eglGetDisplay(nativeDisplayType) {
      EGL.setErrorCode(0x3000 /* EGL_SUCCESS */);
      // Note: As a 'conformant' implementation of EGL, we would prefer to init here only if the user
      //       calls this function with EGL_DEFAULT_DISPLAY. Other display IDs would be preferred to be unsupported
      //       and EGL_NO_DISPLAY returned. Uncomment the following code lines to do this.
      // Instead, an alternative route has been preferred, namely that the Emscripten EGL implementation
      // "emulates" X11, and eglGetDisplay is expected to accept/receive a pointer to an X11 Display object.
      // Therefore, be lax and allow anything to be passed in, and return the magic handle to our default EGLDisplay object.
  
  //    if (nativeDisplayType == 0 /* EGL_DEFAULT_DISPLAY */) {
          return 62000; // Magic ID for Emscripten 'default display'
  //    }
  //    else
  //      return 0; // EGL_NO_DISPLAY
    }

  function _eglGetError() {
      return EGL.errorCode;
    }

  function _eglGetProcAddress(name_) {
      return _emscripten_GetProcAddress(name_);
    }

  function _eglInitialize(display, majorVersion, minorVersion) {
      if (display == 62000 /* Magic ID for Emscripten 'default display' */) {
        if (majorVersion) {
          HEAP32[((majorVersion)>>2)]=1; // Advertise EGL Major version: '1'
        }
        if (minorVersion) {
          HEAP32[((minorVersion)>>2)]=4; // Advertise EGL Minor version: '4'
        }
        EGL.defaultDisplayInitialized = true;
        EGL.setErrorCode(0x3000 /* EGL_SUCCESS */);
        return 1;
      }
      else {
        EGL.setErrorCode(0x3008 /* EGL_BAD_DISPLAY */);
        return 0;
      }
    }

  function _eglMakeCurrent(display, draw, read, context) {
      if (display != 62000 /* Magic ID for Emscripten 'default display' */) {
        EGL.setErrorCode(0x3008 /* EGL_BAD_DISPLAY */);
        return 0 /* EGL_FALSE */;
      }
      //\todo An EGL_NOT_INITIALIZED error is generated if EGL is not initialized for dpy.
      if (context != 0 && context != 62004 /* Magic ID for Emscripten EGLContext */) {
        EGL.setErrorCode(0x3006 /* EGL_BAD_CONTEXT */);
        return 0;
      }
      if ((read != 0 && read != 62006) || (draw != 0 && draw != 62006 /* Magic ID for Emscripten 'default surface' */)) {
        EGL.setErrorCode(0x300D /* EGL_BAD_SURFACE */);
        return 0;
      }
  
      GL.makeContextCurrent(context ? EGL.context : null);
  
      EGL.currentContext = context;
      EGL.currentDrawSurface = draw;
      EGL.currentReadSurface = read;
      EGL.setErrorCode(0x3000 /* EGL_SUCCESS */);
      return 1 /* EGL_TRUE */;
    }

  function _eglQueryString(display, name) {
      if (display != 62000 /* Magic ID for Emscripten 'default display' */) {
        EGL.setErrorCode(0x3008 /* EGL_BAD_DISPLAY */);
        return 0;
      }
      //\todo An EGL_NOT_INITIALIZED error is generated if EGL is not initialized for dpy.
      EGL.setErrorCode(0x3000 /* EGL_SUCCESS */);
      if (EGL.stringCache[name]) return EGL.stringCache[name];
      var ret;
      switch(name) {
        case 0x3053 /* EGL_VENDOR */: ret = allocate(intArrayFromString("Emscripten"), 'i8', ALLOC_NORMAL); break;
        case 0x3054 /* EGL_VERSION */: ret = allocate(intArrayFromString("1.4 Emscripten EGL"), 'i8', ALLOC_NORMAL); break;
        case 0x3055 /* EGL_EXTENSIONS */:  ret = allocate(intArrayFromString(""), 'i8', ALLOC_NORMAL); break; // Currently not supporting any EGL extensions.
        case 0x308D /* EGL_CLIENT_APIS */: ret = allocate(intArrayFromString("OpenGL_ES"), 'i8', ALLOC_NORMAL); break;
        default:
          EGL.setErrorCode(0x300C /* EGL_BAD_PARAMETER */);
          return 0;
      }
      EGL.stringCache[name] = ret;
      return ret;
    }

  function _eglSwapBuffers() {
  
      if (!EGL.defaultDisplayInitialized) {
        EGL.setErrorCode(0x3001 /* EGL_NOT_INITIALIZED */);
      } else if (!Module.ctx) {
        EGL.setErrorCode(0x3002 /* EGL_BAD_ACCESS */);
      } else if (Module.ctx.isContextLost()) {
        EGL.setErrorCode(0x300E /* EGL_CONTEXT_LOST */);
      } else {
        // According to documentation this does an implicit flush.
        // Due to discussion at https://github.com/emscripten-core/emscripten/pull/1871
        // the flush was removed since this _may_ result in slowing code down.
        //_glFlush();
        EGL.setErrorCode(0x3000 /* EGL_SUCCESS */);
        return 1 /* EGL_TRUE */;
      }
      return 0 /* EGL_FALSE */;
    }

  function _eglSwapInterval(display, interval) {
      if (display != 62000 /* Magic ID for Emscripten 'default display' */) {
        EGL.setErrorCode(0x3008 /* EGL_BAD_DISPLAY */);
        return 0;
      }
      if (interval == 0) _emscripten_set_main_loop_timing(0/*EM_TIMING_SETTIMEOUT*/, 0);
      else _emscripten_set_main_loop_timing(1/*EM_TIMING_RAF*/, interval);
  
      EGL.setErrorCode(0x3000 /* EGL_SUCCESS */);
      return 1;
    }

  function _eglTerminate(display) {
      if (display != 62000 /* Magic ID for Emscripten 'default display' */) {
        EGL.setErrorCode(0x3008 /* EGL_BAD_DISPLAY */);
        return 0;
      }
      EGL.currentContext = 0;
      EGL.currentReadSurface = 0;
      EGL.currentDrawSurface = 0;
      EGL.defaultDisplayInitialized = false;
      EGL.setErrorCode(0x3000 /* EGL_SUCCESS */);
      return 1;
    }

  
  function _eglWaitClient() {
      EGL.setErrorCode(0x3000 /* EGL_SUCCESS */);
      return 1;
    }function _eglWaitGL() {
  return _eglWaitClient.apply(null, arguments)
  }

  function _eglWaitNative(nativeEngineId) {
      EGL.setErrorCode(0x3000 /* EGL_SUCCESS */);
      return 1;
    }

  var _emscripten_asm_const_int=true;

  function _emscripten_cancel_main_loop() {
      Browser.mainLoop.pause();
      Browser.mainLoop.func = null;
    }

  
  var JSEvents={keyEvent:0,mouseEvent:0,wheelEvent:0,uiEvent:0,focusEvent:0,deviceOrientationEvent:0,deviceMotionEvent:0,fullscreenChangeEvent:0,pointerlockChangeEvent:0,visibilityChangeEvent:0,touchEvent:0,previousFullscreenElement:null,previousScreenX:null,previousScreenY:null,removeEventListenersRegistered:false,removeAllEventListeners:function () {
        for(var i = JSEvents.eventHandlers.length-1; i >= 0; --i) {
          JSEvents._removeHandler(i);
        }
        JSEvents.eventHandlers = [];
        JSEvents.deferredCalls = [];
      },registerRemoveEventListeners:function () {
        if (!JSEvents.removeEventListenersRegistered) {
          __ATEXIT__.push(JSEvents.removeAllEventListeners);
          JSEvents.removeEventListenersRegistered = true;
        }
      },deferredCalls:[],deferCall:function (targetFunction, precedence, argsList) {
        function arraysHaveEqualContent(arrA, arrB) {
          if (arrA.length != arrB.length) return false;
  
          for(var i in arrA) {
            if (arrA[i] != arrB[i]) return false;
          }
          return true;
        }
        // Test if the given call was already queued, and if so, don't add it again.
        for(var i in JSEvents.deferredCalls) {
          var call = JSEvents.deferredCalls[i];
          if (call.targetFunction == targetFunction && arraysHaveEqualContent(call.argsList, argsList)) {
            return;
          }
        }
        JSEvents.deferredCalls.push({
          targetFunction: targetFunction,
          precedence: precedence,
          argsList: argsList
        });
  
        JSEvents.deferredCalls.sort(function(x,y) { return x.precedence < y.precedence; });
      },removeDeferredCalls:function (targetFunction) {
        for(var i = 0; i < JSEvents.deferredCalls.length; ++i) {
          if (JSEvents.deferredCalls[i].targetFunction == targetFunction) {
            JSEvents.deferredCalls.splice(i, 1);
            --i;
          }
        }
      },canPerformEventHandlerRequests:function () {
        return JSEvents.inEventHandler && JSEvents.currentEventHandler.allowsDeferredCalls;
      },runDeferredCalls:function () {
        if (!JSEvents.canPerformEventHandlerRequests()) {
          return;
        }
        for(var i = 0; i < JSEvents.deferredCalls.length; ++i) {
          var call = JSEvents.deferredCalls[i];
          JSEvents.deferredCalls.splice(i, 1);
          --i;
          call.targetFunction.apply(this, call.argsList);
        }
      },inEventHandler:0,currentEventHandler:null,eventHandlers:[],isInternetExplorer:function () { return navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0; },removeAllHandlersOnTarget:function (target, eventTypeString) {
        for(var i = 0; i < JSEvents.eventHandlers.length; ++i) {
          if (JSEvents.eventHandlers[i].target == target && 
            (!eventTypeString || eventTypeString == JSEvents.eventHandlers[i].eventTypeString)) {
             JSEvents._removeHandler(i--);
           }
        }
      },_removeHandler:function (i) {
        var h = JSEvents.eventHandlers[i];
        h.target.removeEventListener(h.eventTypeString, h.eventListenerFunc, h.useCapture);
        JSEvents.eventHandlers.splice(i, 1);
      },registerOrRemoveHandler:function (eventHandler) {
        var jsEventHandler = function jsEventHandler(event) {
          // Increment nesting count for the event handler.
          ++JSEvents.inEventHandler;
          JSEvents.currentEventHandler = eventHandler;
          // Process any old deferred calls the user has placed.
          JSEvents.runDeferredCalls();
          // Process the actual event, calls back to user C code handler.
          eventHandler.handlerFunc(event);
          // Process any new deferred calls that were placed right now from this event handler.
          JSEvents.runDeferredCalls();
          // Out of event handler - restore nesting count.
          --JSEvents.inEventHandler;
        }
        
        if (eventHandler.callbackfunc) {
          eventHandler.eventListenerFunc = jsEventHandler;
          eventHandler.target.addEventListener(eventHandler.eventTypeString, jsEventHandler, eventHandler.useCapture);
          JSEvents.eventHandlers.push(eventHandler);
          JSEvents.registerRemoveEventListeners();
        } else {
          for(var i = 0; i < JSEvents.eventHandlers.length; ++i) {
            if (JSEvents.eventHandlers[i].target == eventHandler.target
             && JSEvents.eventHandlers[i].eventTypeString == eventHandler.eventTypeString) {
               JSEvents._removeHandler(i--);
             }
          }
        }
      },getBoundingClientRectOrZeros:function (target) {
        return target.getBoundingClientRect ? target.getBoundingClientRect() : { left: 0, top: 0 };
      },pageScrollPos:function () {
        if (window.pageXOffset > 0 || window.pageYOffset > 0) {
          return [window.pageXOffset, window.pageYOffset];
        }
        if (typeof document.documentElement.scrollLeft !== 'undefined' || typeof document.documentElement.scrollTop !== 'undefined') {
          return [document.documentElement.scrollLeft, document.documentElement.scrollTop];
        }
        return [document.body.scrollLeft|0, document.body.scrollTop|0];
      },getNodeNameForTarget:function (target) {
        if (!target) return '';
        if (target == window) return '#window';
        if (target == screen) return '#screen';
        return (target && target.nodeName) ? target.nodeName : '';
      },tick:function () {
        if (window['performance'] && window['performance']['now']) return window['performance']['now']();
        else return Date.now();
      },fullscreenEnabled:function () {
        return document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled || document.msFullscreenEnabled;
      }};
  
  var __currentFullscreenStrategy={};
  
  
  
  
  
  
  
  
  var __specialEventTargets=[0, typeof document !== 'undefined' ? document : 0, typeof window !== 'undefined' ? window : 0];function __findEventTarget(target) {
      warnOnce('Rules for selecting event targets in HTML5 API are changing: instead of using document.getElementById() that only can refer to elements by their DOM ID, new event target selection mechanism uses the more flexible function document.querySelector() that can look up element names, classes, and complex CSS selectors. Build with -s DISABLE_DEPRECATED_FIND_EVENT_TARGET_BEHAVIOR=1 to change to the new lookup rules. See https://github.com/emscripten-core/emscripten/pull/7977 for more details.');
      try {
        // The sensible "default" target varies between events, but use window as the default
        // since DOM events mostly can default to that. Specific callback registrations
        // override their own defaults.
        if (!target) return window;
        if (typeof target === "number") target = __specialEventTargets[target] || UTF8ToString(target);
        if (target === '#window') return window;
        else if (target === '#document') return document;
        else if (target === '#screen') return screen;
        else if (target === '#canvas') return Module['canvas'];
        return (typeof target === 'string') ? document.getElementById(target) : target;
      } catch(e) {
        // In Web Workers, some objects above, such as '#document' do not exist. Gracefully
        // return null for them.
        return null;
      }
    }function __findCanvasEventTarget(target) {
      if (typeof target === 'number') target = UTF8ToString(target);
      if (!target || target === '#canvas') {
        if (typeof GL !== 'undefined' && GL.offscreenCanvases['canvas']) return GL.offscreenCanvases['canvas']; // TODO: Remove this line, target '#canvas' should refer only to Module['canvas'], not to GL.offscreenCanvases['canvas'] - but need stricter tests to be able to remove this line.
        return Module['canvas'];
      }
      if (typeof GL !== 'undefined' && GL.offscreenCanvases[target]) return GL.offscreenCanvases[target];
      return __findEventTarget(target);
    }function _emscripten_get_canvas_element_size(target, width, height) {
      var canvas = __findCanvasEventTarget(target);
      if (!canvas) return -4;
      HEAP32[((width)>>2)]=canvas.width;
      HEAP32[((height)>>2)]=canvas.height;
    }function __get_canvas_element_size(target) {
      var stackTop = stackSave();
      var w = stackAlloc(8);
      var h = w + 4;
  
      var targetInt = stackAlloc(target.id.length+1);
      stringToUTF8(target.id, targetInt, target.id.length+1);
      var ret = _emscripten_get_canvas_element_size(targetInt, w, h);
      var size = [HEAP32[((w)>>2)], HEAP32[((h)>>2)]];
      stackRestore(stackTop);
      return size;
    }
  
  
  function _emscripten_set_canvas_element_size(target, width, height) {
      var canvas = __findCanvasEventTarget(target);
      if (!canvas) return -4;
      canvas.width = width;
      canvas.height = height;
      return 0;
    }function __set_canvas_element_size(target, width, height) {
      if (!target.controlTransferredOffscreen) {
        target.width = width;
        target.height = height;
      } else {
        // This function is being called from high-level JavaScript code instead of asm.js/Wasm,
        // and it needs to synchronously proxy over to another thread, so marshal the string onto the heap to do the call.
        var stackTop = stackSave();
        var targetInt = stackAlloc(target.id.length+1);
        stringToUTF8(target.id, targetInt, target.id.length+1);
        _emscripten_set_canvas_element_size(targetInt, width, height);
        stackRestore(stackTop);
      }
    }function __registerRestoreOldStyle(canvas) {
      var canvasSize = __get_canvas_element_size(canvas);
      var oldWidth = canvasSize[0];
      var oldHeight = canvasSize[1];
      var oldCssWidth = canvas.style.width;
      var oldCssHeight = canvas.style.height;
      var oldBackgroundColor = canvas.style.backgroundColor; // Chrome reads color from here.
      var oldDocumentBackgroundColor = document.body.style.backgroundColor; // IE11 reads color from here.
      // Firefox always has black background color.
      var oldPaddingLeft = canvas.style.paddingLeft; // Chrome, FF, Safari
      var oldPaddingRight = canvas.style.paddingRight;
      var oldPaddingTop = canvas.style.paddingTop;
      var oldPaddingBottom = canvas.style.paddingBottom;
      var oldMarginLeft = canvas.style.marginLeft; // IE11
      var oldMarginRight = canvas.style.marginRight;
      var oldMarginTop = canvas.style.marginTop;
      var oldMarginBottom = canvas.style.marginBottom;
      var oldDocumentBodyMargin = document.body.style.margin;
      var oldDocumentOverflow = document.documentElement.style.overflow; // Chrome, Firefox
      var oldDocumentScroll = document.body.scroll; // IE
      var oldImageRendering = canvas.style.imageRendering;
  
      function restoreOldStyle() {
        var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
        if (!fullscreenElement) {
          document.removeEventListener('fullscreenchange', restoreOldStyle);
          document.removeEventListener('mozfullscreenchange', restoreOldStyle);
          document.removeEventListener('webkitfullscreenchange', restoreOldStyle);
          document.removeEventListener('MSFullscreenChange', restoreOldStyle);
  
          __set_canvas_element_size(canvas, oldWidth, oldHeight);
  
          canvas.style.width = oldCssWidth;
          canvas.style.height = oldCssHeight;
          canvas.style.backgroundColor = oldBackgroundColor; // Chrome
          // IE11 hack: assigning 'undefined' or an empty string to document.body.style.backgroundColor has no effect, so first assign back the default color
          // before setting the undefined value. Setting undefined value is also important, or otherwise we would later treat that as something that the user
          // had explicitly set so subsequent fullscreen transitions would not set background color properly.
          if (!oldDocumentBackgroundColor) document.body.style.backgroundColor = 'white';
          document.body.style.backgroundColor = oldDocumentBackgroundColor; // IE11
          canvas.style.paddingLeft = oldPaddingLeft; // Chrome, FF, Safari
          canvas.style.paddingRight = oldPaddingRight;
          canvas.style.paddingTop = oldPaddingTop;
          canvas.style.paddingBottom = oldPaddingBottom;
          canvas.style.marginLeft = oldMarginLeft; // IE11
          canvas.style.marginRight = oldMarginRight;
          canvas.style.marginTop = oldMarginTop;
          canvas.style.marginBottom = oldMarginBottom;
          document.body.style.margin = oldDocumentBodyMargin;
          document.documentElement.style.overflow = oldDocumentOverflow; // Chrome, Firefox
          document.body.scroll = oldDocumentScroll; // IE
          canvas.style.imageRendering = oldImageRendering;
          if (canvas.GLctxObject) canvas.GLctxObject.GLctx.viewport(0, 0, oldWidth, oldHeight);
  
          if (__currentFullscreenStrategy.canvasResizedCallback) {
            dynCall_iiii(__currentFullscreenStrategy.canvasResizedCallback, 37, 0, __currentFullscreenStrategy.canvasResizedCallbackUserData);
          }
        }
      }
      document.addEventListener('fullscreenchange', restoreOldStyle);
      document.addEventListener('mozfullscreenchange', restoreOldStyle);
      document.addEventListener('webkitfullscreenchange', restoreOldStyle);
      document.addEventListener('MSFullscreenChange', restoreOldStyle);
      return restoreOldStyle;
    }
  
  function __setLetterbox(element, topBottom, leftRight) {
      if (JSEvents.isInternetExplorer()) {
        // Cannot use padding on IE11, because IE11 computes padding in addition to the size, unlike
        // other browsers, which treat padding to be part of the size.
        // e.g.
        // FF, Chrome: If CSS size = 1920x1080, padding-leftright = 460, padding-topbottomx40, then content size = (1920 - 2*460) x (1080-2*40) = 1000x1000px, and total element size = 1920x1080px.
        //       IE11: If CSS size = 1920x1080, padding-leftright = 460, padding-topbottomx40, then content size = 1920x1080px and total element size = (1920+2*460) x (1080+2*40)px.
        // IE11  treats margin like Chrome and FF treat padding.
        element.style.marginLeft = element.style.marginRight = leftRight + 'px';
        element.style.marginTop = element.style.marginBottom = topBottom + 'px';
      } else {
        // Cannot use margin to specify letterboxes in FF or Chrome, since those ignore margins in fullscreen mode.
        element.style.paddingLeft = element.style.paddingRight = leftRight + 'px';
        element.style.paddingTop = element.style.paddingBottom = topBottom + 'px';
      }
    }function _JSEvents_resizeCanvasForFullscreen(target, strategy) {
      var restoreOldStyle = __registerRestoreOldStyle(target);
      var cssWidth = strategy.softFullscreen ? window.innerWidth : screen.width;
      var cssHeight = strategy.softFullscreen ? window.innerHeight : screen.height;
      var rect = target.getBoundingClientRect();
      var windowedCssWidth = rect.right - rect.left;
      var windowedCssHeight = rect.bottom - rect.top;
      var canvasSize = __get_canvas_element_size(target);
      var windowedRttWidth = canvasSize[0];
      var windowedRttHeight = canvasSize[1];
  
      if (strategy.scaleMode == 3) {
        __setLetterbox(target, (cssHeight - windowedCssHeight) / 2, (cssWidth - windowedCssWidth) / 2);
        cssWidth = windowedCssWidth;
        cssHeight = windowedCssHeight;
      } else if (strategy.scaleMode == 2) {
        if (cssWidth*windowedRttHeight < windowedRttWidth*cssHeight) {
          var desiredCssHeight = windowedRttHeight * cssWidth / windowedRttWidth;
          __setLetterbox(target, (cssHeight - desiredCssHeight) / 2, 0);
          cssHeight = desiredCssHeight;
        } else {
          var desiredCssWidth = windowedRttWidth * cssHeight / windowedRttHeight;
          __setLetterbox(target, 0, (cssWidth - desiredCssWidth) / 2);
          cssWidth = desiredCssWidth;
        }
      }
  
      // If we are adding padding, must choose a background color or otherwise Chrome will give the
      // padding a default white color. Do it only if user has not customized their own background color.
      if (!target.style.backgroundColor) target.style.backgroundColor = 'black';
      // IE11 does the same, but requires the color to be set in the document body.
      if (!document.body.style.backgroundColor) document.body.style.backgroundColor = 'black'; // IE11
      // Firefox always shows black letterboxes independent of style color.
  
      target.style.width = cssWidth + 'px';
      target.style.height = cssHeight + 'px';
  
      if (strategy.filteringMode == 1) {
        target.style.imageRendering = 'optimizeSpeed';
        target.style.imageRendering = '-moz-crisp-edges';
        target.style.imageRendering = '-o-crisp-edges';
        target.style.imageRendering = '-webkit-optimize-contrast';
        target.style.imageRendering = 'optimize-contrast';
        target.style.imageRendering = 'crisp-edges';
        target.style.imageRendering = 'pixelated';
      }
  
      var dpiScale = (strategy.canvasResolutionScaleMode == 2) ? window.devicePixelRatio : 1;
      if (strategy.canvasResolutionScaleMode != 0) {
        var newWidth = (cssWidth * dpiScale)|0;
        var newHeight = (cssHeight * dpiScale)|0;
        __set_canvas_element_size(target, newWidth, newHeight);
        if (target.GLctxObject) target.GLctxObject.GLctx.viewport(0, 0, newWidth, newHeight);
      }
      return restoreOldStyle;
    }function _JSEvents_requestFullscreen(target, strategy) {
      // EMSCRIPTEN_FULLSCREEN_SCALE_DEFAULT + EMSCRIPTEN_FULLSCREEN_CANVAS_SCALE_NONE is a mode where no extra logic is performed to the DOM elements.
      if (strategy.scaleMode != 0 || strategy.canvasResolutionScaleMode != 0) {
        _JSEvents_resizeCanvasForFullscreen(target, strategy);
      }
  
      if (target.requestFullscreen) {
        target.requestFullscreen();
      } else if (target.msRequestFullscreen) {
        target.msRequestFullscreen();
      } else if (target.mozRequestFullScreen) {
        target.mozRequestFullScreen();
      } else if (target.mozRequestFullscreen) {
        target.mozRequestFullscreen();
      } else if (target.webkitRequestFullscreen) {
        target.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      } else {
        if (typeof JSEvents.fullscreenEnabled() === 'undefined') {
          return -1;
        } else {
          return -3;
        }
      }
  
      if (strategy.canvasResizedCallback) {
        dynCall_iiii(strategy.canvasResizedCallback, 37, 0, strategy.canvasResizedCallbackUserData);
      }
  
      return 0;
    }function _emscripten_exit_fullscreen() {
      if (typeof JSEvents.fullscreenEnabled() === 'undefined') return -1;
      // Make sure no queued up calls will fire after this.
      JSEvents.removeDeferredCalls(_JSEvents_requestFullscreen);
  
      var d = __specialEventTargets[1];
      if (d.exitFullscreen) {
        d.fullscreenElement && d.exitFullscreen();
      } else if (d.msExitFullscreen) {
        d.msFullscreenElement && d.msExitFullscreen();
      } else if (d.mozCancelFullScreen) {
        d.mozFullScreenElement && d.mozCancelFullScreen();
      } else if (d.webkitExitFullscreen) {
        d.webkitFullscreenElement && d.webkitExitFullscreen();
      } else {
        return -1;
      }
  
      if (__currentFullscreenStrategy.canvasResizedCallback) {
        dynCall_iiii(__currentFullscreenStrategy.canvasResizedCallback, 37, 0, __currentFullscreenStrategy.canvasResizedCallbackUserData);
        __currentFullscreenStrategy = 0;
      }
  
      return 0;
    }

  
  function __requestPointerLock(target) {
      if (target.requestPointerLock) {
        target.requestPointerLock();
      } else if (target.mozRequestPointerLock) {
        target.mozRequestPointerLock();
      } else if (target.webkitRequestPointerLock) {
        target.webkitRequestPointerLock();
      } else if (target.msRequestPointerLock) {
        target.msRequestPointerLock();
      } else {
        // document.body is known to accept pointer lock, so use that to differentiate if the user passed a bad element,
        // or if the whole browser just doesn't support the feature.
        if (document.body.requestPointerLock || document.body.mozRequestPointerLock || document.body.webkitRequestPointerLock || document.body.msRequestPointerLock) {
          return -3;
        } else {
          return -1;
        }
      }
      return 0;
    }function _emscripten_exit_pointerlock() {
      // Make sure no queued up calls will fire after this.
      JSEvents.removeDeferredCalls(__requestPointerLock);
  
      if (document.exitPointerLock) {
        document.exitPointerLock();
      } else if (document.msExitPointerLock) {
        document.msExitPointerLock();
      } else if (document.mozExitPointerLock) {
        document.mozExitPointerLock();
      } else if (document.webkitExitPointerLock) {
        document.webkitExitPointerLock();
      } else {
        return -1;
      }
      return 0;
    }

  function _emscripten_get_device_pixel_ratio() {
      return window.devicePixelRatio || 1.0;
    }

  function _emscripten_get_element_css_size(target, width, height) {
      target = target ? __findEventTarget(target) : Module['canvas'];
      if (!target) return -4;
  
      if (target.getBoundingClientRect) {
        var rect = target.getBoundingClientRect();
        HEAPF64[((width)>>3)]=rect.right - rect.left;
        HEAPF64[((height)>>3)]=rect.bottom - rect.top;
      } else {
        HEAPF64[((width)>>3)]=target.clientWidth;
        HEAPF64[((height)>>3)]=target.clientHeight;
      }
  
      return 0;
    }

  
  function __fillGamepadEventData(eventStruct, e) {
      HEAPF64[((eventStruct)>>3)]=e.timestamp;
      for(var i = 0; i < e.axes.length; ++i) {
        HEAPF64[(((eventStruct+i*8)+(16))>>3)]=e.axes[i];
      }
      for(var i = 0; i < e.buttons.length; ++i) {
        if (typeof(e.buttons[i]) === 'object') {
          HEAPF64[(((eventStruct+i*8)+(528))>>3)]=e.buttons[i].value;
        } else {
          HEAPF64[(((eventStruct+i*8)+(528))>>3)]=e.buttons[i];
        }
      }
      for(var i = 0; i < e.buttons.length; ++i) {
        if (typeof(e.buttons[i]) === 'object') {
          HEAP32[(((eventStruct+i*4)+(1040))>>2)]=e.buttons[i].pressed;
        } else {
          HEAP32[(((eventStruct+i*4)+(1040))>>2)]=e.buttons[i] == 1.0;
        }
      }
      HEAP32[(((eventStruct)+(1296))>>2)]=e.connected;
      HEAP32[(((eventStruct)+(1300))>>2)]=e.index;
      HEAP32[(((eventStruct)+(8))>>2)]=e.axes.length;
      HEAP32[(((eventStruct)+(12))>>2)]=e.buttons.length;
      stringToUTF8(e.id, eventStruct + 1304, 64);
      stringToUTF8(e.mapping, eventStruct + 1368, 64);
    }function _emscripten_get_gamepad_status(index, gamepadState) {
      if (!JSEvents.lastGamepadState) throw 'emscripten_get_gamepad_status() can only be called after having first called emscripten_sample_gamepad_data() and that function has returned EMSCRIPTEN_RESULT_SUCCESS!';
  
      // INVALID_PARAM is returned on a Gamepad index that never was there.
      if (index < 0 || index >= JSEvents.lastGamepadState.length) return -5;
  
      // NO_DATA is returned on a Gamepad index that was removed.
      // For previously disconnected gamepads there should be an empty slot (null/undefined/false) at the index.
      // This is because gamepads must keep their original position in the array.
      // For example, removing the first of two gamepads produces [null/undefined/false, gamepad].
      if (!JSEvents.lastGamepadState[index]) return -7;
  
      __fillGamepadEventData(gamepadState, JSEvents.lastGamepadState[index]);
      return 0;
    }

  function _emscripten_get_heap_size() {
      return HEAP8.length;
    }

  function _emscripten_get_num_gamepads() {
      if (!JSEvents.lastGamepadState) throw 'emscripten_get_num_gamepads() can only be called after having first called emscripten_sample_gamepad_data() and that function has returned EMSCRIPTEN_RESULT_SUCCESS!';
      // N.B. Do not call emscripten_get_num_gamepads() unless having first called emscripten_sample_gamepad_data(), and that has returned EMSCRIPTEN_RESULT_SUCCESS.
      // Otherwise the following line will throw an exception.
      return JSEvents.lastGamepadState.length;
    }

  function _emscripten_glActiveTexture(x0) { GLctx['activeTexture'](x0) }

  function _emscripten_glAttachShader(program, shader) {
      GLctx.attachShader(GL.programs[program],
                              GL.shaders[shader]);
    }

  function _emscripten_glBeginQueryEXT(target, id) {
      GLctx.disjointTimerQueryExt['beginQueryEXT'](target, GL.timerQueriesEXT[id]);
    }

  function _emscripten_glBindAttribLocation(program, index, name) {
      GLctx.bindAttribLocation(GL.programs[program], index, UTF8ToString(name));
    }

  function _emscripten_glBindBuffer(target, buffer) {
  
      GLctx.bindBuffer(target, GL.buffers[buffer]);
    }

  function _emscripten_glBindFramebuffer(target, framebuffer) {
  
      GLctx.bindFramebuffer(target, GL.framebuffers[framebuffer]);
  
    }

  function _emscripten_glBindRenderbuffer(target, renderbuffer) {
      GLctx.bindRenderbuffer(target, GL.renderbuffers[renderbuffer]);
    }

  function _emscripten_glBindTexture(target, texture) {
      GLctx.bindTexture(target, GL.textures[texture]);
    }

  function _emscripten_glBindVertexArrayOES(vao) {
      GLctx['bindVertexArray'](GL.vaos[vao]);
    }

  function _emscripten_glBlendColor(x0, x1, x2, x3) { GLctx['blendColor'](x0, x1, x2, x3) }

  function _emscripten_glBlendEquation(x0) { GLctx['blendEquation'](x0) }

  function _emscripten_glBlendEquationSeparate(x0, x1) { GLctx['blendEquationSeparate'](x0, x1) }

  function _emscripten_glBlendFunc(x0, x1) { GLctx['blendFunc'](x0, x1) }

  function _emscripten_glBlendFuncSeparate(x0, x1, x2, x3) { GLctx['blendFuncSeparate'](x0, x1, x2, x3) }

  function _emscripten_glBufferData(target, size, data, usage) {
        // N.b. here first form specifies a heap subarray, second form an integer size, so the ?: code here is polymorphic. It is advised to avoid
        // randomly mixing both uses in calling code, to avoid any potential JS engine JIT issues.
        GLctx.bufferData(target, data ? HEAPU8.subarray(data, data+size) : size, usage);
    }

  function _emscripten_glBufferSubData(target, offset, size, data) {
      GLctx.bufferSubData(target, offset, HEAPU8.subarray(data, data+size));
    }

  function _emscripten_glCheckFramebufferStatus(x0) { return GLctx['checkFramebufferStatus'](x0) }

  function _emscripten_glClear(x0) { GLctx['clear'](x0) }

  function _emscripten_glClearColor(x0, x1, x2, x3) { GLctx['clearColor'](x0, x1, x2, x3) }

  function _emscripten_glClearDepthf(x0) { GLctx['clearDepth'](x0) }

  function _emscripten_glClearStencil(x0) { GLctx['clearStencil'](x0) }

  function _emscripten_glColorMask(red, green, blue, alpha) {
      GLctx.colorMask(!!red, !!green, !!blue, !!alpha);
    }

  function _emscripten_glCompileShader(shader) {
      GLctx.compileShader(GL.shaders[shader]);
    }

  function _emscripten_glCompressedTexImage2D(target, level, internalFormat, width, height, border, imageSize, data) {
      GLctx['compressedTexImage2D'](target, level, internalFormat, width, height, border, data ? HEAPU8.subarray((data),(data+imageSize)) : null);
    }

  function _emscripten_glCompressedTexSubImage2D(target, level, xoffset, yoffset, width, height, format, imageSize, data) {
      GLctx['compressedTexSubImage2D'](target, level, xoffset, yoffset, width, height, format, data ? HEAPU8.subarray((data),(data+imageSize)) : null);
    }

  function _emscripten_glCopyTexImage2D(x0, x1, x2, x3, x4, x5, x6, x7) { GLctx['copyTexImage2D'](x0, x1, x2, x3, x4, x5, x6, x7) }

  function _emscripten_glCopyTexSubImage2D(x0, x1, x2, x3, x4, x5, x6, x7) { GLctx['copyTexSubImage2D'](x0, x1, x2, x3, x4, x5, x6, x7) }

  function _emscripten_glCreateProgram() {
      var id = GL.getNewId(GL.programs);
      var program = GLctx.createProgram();
      program.name = id;
      GL.programs[id] = program;
      return id;
    }

  function _emscripten_glCreateShader(shaderType) {
      var id = GL.getNewId(GL.shaders);
      GL.shaders[id] = GLctx.createShader(shaderType);
      return id;
    }

  function _emscripten_glCullFace(x0) { GLctx['cullFace'](x0) }

  function _emscripten_glDeleteBuffers(n, buffers) {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(((buffers)+(i*4))>>2)];
        var buffer = GL.buffers[id];
  
        // From spec: "glDeleteBuffers silently ignores 0's and names that do not
        // correspond to existing buffer objects."
        if (!buffer) continue;
  
        GLctx.deleteBuffer(buffer);
        buffer.name = 0;
        GL.buffers[id] = null;
  
        if (id == GL.currArrayBuffer) GL.currArrayBuffer = 0;
        if (id == GL.currElementArrayBuffer) GL.currElementArrayBuffer = 0;
      }
    }

  function _emscripten_glDeleteFramebuffers(n, framebuffers) {
      for (var i = 0; i < n; ++i) {
        var id = HEAP32[(((framebuffers)+(i*4))>>2)];
        var framebuffer = GL.framebuffers[id];
        if (!framebuffer) continue; // GL spec: "glDeleteFramebuffers silently ignores 0s and names that do not correspond to existing framebuffer objects".
        GLctx.deleteFramebuffer(framebuffer);
        framebuffer.name = 0;
        GL.framebuffers[id] = null;
      }
    }

  function _emscripten_glDeleteProgram(id) {
      if (!id) return;
      var program = GL.programs[id];
      if (!program) { // glDeleteProgram actually signals an error when deleting a nonexisting object, unlike some other GL delete functions.
        GL.recordError(0x0501 /* GL_INVALID_VALUE */);
        return;
      }
      GLctx.deleteProgram(program);
      program.name = 0;
      GL.programs[id] = null;
      GL.programInfos[id] = null;
    }

  function _emscripten_glDeleteQueriesEXT(n, ids) {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(((ids)+(i*4))>>2)];
        var query = GL.timerQueriesEXT[id];
        if (!query) continue; // GL spec: "unused names in ids are ignored, as is the name zero."
        GLctx.disjointTimerQueryExt['deleteQueryEXT'](query);
        GL.timerQueriesEXT[id] = null;
      }
    }

  function _emscripten_glDeleteRenderbuffers(n, renderbuffers) {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(((renderbuffers)+(i*4))>>2)];
        var renderbuffer = GL.renderbuffers[id];
        if (!renderbuffer) continue; // GL spec: "glDeleteRenderbuffers silently ignores 0s and names that do not correspond to existing renderbuffer objects".
        GLctx.deleteRenderbuffer(renderbuffer);
        renderbuffer.name = 0;
        GL.renderbuffers[id] = null;
      }
    }

  function _emscripten_glDeleteShader(id) {
      if (!id) return;
      var shader = GL.shaders[id];
      if (!shader) { // glDeleteShader actually signals an error when deleting a nonexisting object, unlike some other GL delete functions.
        GL.recordError(0x0501 /* GL_INVALID_VALUE */);
        return;
      }
      GLctx.deleteShader(shader);
      GL.shaders[id] = null;
    }

  function _emscripten_glDeleteTextures(n, textures) {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(((textures)+(i*4))>>2)];
        var texture = GL.textures[id];
        if (!texture) continue; // GL spec: "glDeleteTextures silently ignores 0s and names that do not correspond to existing textures".
        GLctx.deleteTexture(texture);
        texture.name = 0;
        GL.textures[id] = null;
      }
    }

  function _emscripten_glDeleteVertexArraysOES(n, vaos) {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(((vaos)+(i*4))>>2)];
        GLctx['deleteVertexArray'](GL.vaos[id]);
        GL.vaos[id] = null;
      }
    }

  function _emscripten_glDepthFunc(x0) { GLctx['depthFunc'](x0) }

  function _emscripten_glDepthMask(flag) {
      GLctx.depthMask(!!flag);
    }

  function _emscripten_glDepthRangef(x0, x1) { GLctx['depthRange'](x0, x1) }

  function _emscripten_glDetachShader(program, shader) {
      GLctx.detachShader(GL.programs[program],
                              GL.shaders[shader]);
    }

  function _emscripten_glDisable(x0) { GLctx['disable'](x0) }

  function _emscripten_glDisableVertexAttribArray(index) {
      GLctx.disableVertexAttribArray(index);
    }

  function _emscripten_glDrawArrays(mode, first, count) {
  
      GLctx.drawArrays(mode, first, count);
  
    }

  function _emscripten_glDrawArraysInstancedANGLE(mode, first, count, primcount) {
      GLctx['drawArraysInstanced'](mode, first, count, primcount);
    }

  
  var __tempFixedLengthArray=[];function _emscripten_glDrawBuffersWEBGL(n, bufs) {
  
      var bufArray = __tempFixedLengthArray[n];
      for (var i = 0; i < n; i++) {
        bufArray[i] = HEAP32[(((bufs)+(i*4))>>2)];
      }
  
      GLctx['drawBuffers'](bufArray);
    }

  function _emscripten_glDrawElements(mode, count, type, indices) {
  
      GLctx.drawElements(mode, count, type, indices);
  
    }

  function _emscripten_glDrawElementsInstancedANGLE(mode, count, type, indices, primcount) {
      GLctx['drawElementsInstanced'](mode, count, type, indices, primcount);
    }

  function _emscripten_glEnable(x0) { GLctx['enable'](x0) }

  function _emscripten_glEnableVertexAttribArray(index) {
      GLctx.enableVertexAttribArray(index);
    }

  function _emscripten_glEndQueryEXT(target) {
      GLctx.disjointTimerQueryExt['endQueryEXT'](target);
    }

  function _emscripten_glFinish() { GLctx['finish']() }

  function _emscripten_glFlush() { GLctx['flush']() }

  function _emscripten_glFramebufferRenderbuffer(target, attachment, renderbuffertarget, renderbuffer) {
      GLctx.framebufferRenderbuffer(target, attachment, renderbuffertarget,
                                         GL.renderbuffers[renderbuffer]);
    }

  function _emscripten_glFramebufferTexture2D(target, attachment, textarget, texture, level) {
      GLctx.framebufferTexture2D(target, attachment, textarget,
                                      GL.textures[texture], level);
    }

  function _emscripten_glFrontFace(x0) { GLctx['frontFace'](x0) }

  
  function __glGenObject(n, buffers, createFunction, objectTable
      ) {
      for (var i = 0; i < n; i++) {
        var buffer = GLctx[createFunction]();
        var id = buffer && GL.getNewId(objectTable);
        if (buffer) {
          buffer.name = id;
          objectTable[id] = buffer;
        } else {
          GL.recordError(0x0502 /* GL_INVALID_OPERATION */);
        }
        HEAP32[(((buffers)+(i*4))>>2)]=id;
      }
    }function _emscripten_glGenBuffers(n, buffers) {
      __glGenObject(n, buffers, 'createBuffer', GL.buffers
        );
    }

  function _emscripten_glGenFramebuffers(n, ids) {
      __glGenObject(n, ids, 'createFramebuffer', GL.framebuffers
        );
    }

  function _emscripten_glGenQueriesEXT(n, ids) {
      for (var i = 0; i < n; i++) {
        var query = GLctx.disjointTimerQueryExt['createQueryEXT']();
        if (!query) {
          GL.recordError(0x0502 /* GL_INVALID_OPERATION */);
          while(i < n) HEAP32[(((ids)+(i++*4))>>2)]=0;
          return;
        }
        var id = GL.getNewId(GL.timerQueriesEXT);
        query.name = id;
        GL.timerQueriesEXT[id] = query;
        HEAP32[(((ids)+(i*4))>>2)]=id;
      }
    }

  function _emscripten_glGenRenderbuffers(n, renderbuffers) {
      __glGenObject(n, renderbuffers, 'createRenderbuffer', GL.renderbuffers
        );
    }

  function _emscripten_glGenTextures(n, textures) {
      __glGenObject(n, textures, 'createTexture', GL.textures
        );
    }

  function _emscripten_glGenVertexArraysOES(n, arrays) {
      __glGenObject(n, arrays, 'createVertexArray', GL.vaos
        );
    }

  function _emscripten_glGenerateMipmap(x0) { GLctx['generateMipmap'](x0) }

  function _emscripten_glGetActiveAttrib(program, index, bufSize, length, size, type, name) {
      program = GL.programs[program];
      var info = GLctx.getActiveAttrib(program, index);
      if (!info) return; // If an error occurs, nothing will be written to length, size and type and name.
  
      if (bufSize > 0 && name) {
        var numBytesWrittenExclNull = stringToUTF8(info.name, name, bufSize);
        if (length) HEAP32[((length)>>2)]=numBytesWrittenExclNull;
      } else {
        if (length) HEAP32[((length)>>2)]=0;
      }
  
      if (size) HEAP32[((size)>>2)]=info.size;
      if (type) HEAP32[((type)>>2)]=info.type;
    }

  function _emscripten_glGetActiveUniform(program, index, bufSize, length, size, type, name) {
      program = GL.programs[program];
      var info = GLctx.getActiveUniform(program, index);
      if (!info) return; // If an error occurs, nothing will be written to length, size, type and name.
  
      if (bufSize > 0 && name) {
        var numBytesWrittenExclNull = stringToUTF8(info.name, name, bufSize);
        if (length) HEAP32[((length)>>2)]=numBytesWrittenExclNull;
      } else {
        if (length) HEAP32[((length)>>2)]=0;
      }
  
      if (size) HEAP32[((size)>>2)]=info.size;
      if (type) HEAP32[((type)>>2)]=info.type;
    }

  function _emscripten_glGetAttachedShaders(program, maxCount, count, shaders) {
      var result = GLctx.getAttachedShaders(GL.programs[program]);
      var len = result.length;
      if (len > maxCount) {
        len = maxCount;
      }
      HEAP32[((count)>>2)]=len;
      for (var i = 0; i < len; ++i) {
        var id = GL.shaders.indexOf(result[i]);
        HEAP32[(((shaders)+(i*4))>>2)]=id;
      }
    }

  function _emscripten_glGetAttribLocation(program, name) {
      return GLctx.getAttribLocation(GL.programs[program], UTF8ToString(name));
    }

  
  function emscriptenWebGLGet(name_, p, type) {
      // Guard against user passing a null pointer.
      // Note that GLES2 spec does not say anything about how passing a null pointer should be treated.
      // Testing on desktop core GL 3, the application crashes on glGetIntegerv to a null pointer, but
      // better to report an error instead of doing anything random.
      if (!p) {
        GL.recordError(0x0501 /* GL_INVALID_VALUE */);
        return;
      }
      var ret = undefined;
      switch(name_) { // Handle a few trivial GLES values
        case 0x8DFA: // GL_SHADER_COMPILER
          ret = 1;
          break;
        case 0x8DF8: // GL_SHADER_BINARY_FORMATS
          if (type !== 'Integer' && type !== 'Integer64') {
            GL.recordError(0x0500); // GL_INVALID_ENUM
          }
          return; // Do not write anything to the out pointer, since no binary formats are supported.
        case 0x8DF9: // GL_NUM_SHADER_BINARY_FORMATS
          ret = 0;
          break;
        case 0x86A2: // GL_NUM_COMPRESSED_TEXTURE_FORMATS
          // WebGL doesn't have GL_NUM_COMPRESSED_TEXTURE_FORMATS (it's obsolete since GL_COMPRESSED_TEXTURE_FORMATS returns a JS array that can be queried for length),
          // so implement it ourselves to allow C++ GLES2 code get the length.
          var formats = GLctx.getParameter(0x86A3 /*GL_COMPRESSED_TEXTURE_FORMATS*/);
          ret = formats ? formats.length : 0;
          break;
      }
  
      if (ret === undefined) {
        var result = GLctx.getParameter(name_);
        switch (typeof(result)) {
          case "number":
            ret = result;
            break;
          case "boolean":
            ret = result ? 1 : 0;
            break;
          case "string":
            GL.recordError(0x0500); // GL_INVALID_ENUM
            return;
          case "object":
            if (result === null) {
              // null is a valid result for some (e.g., which buffer is bound - perhaps nothing is bound), but otherwise
              // can mean an invalid name_, which we need to report as an error
              switch(name_) {
                case 0x8894: // ARRAY_BUFFER_BINDING
                case 0x8B8D: // CURRENT_PROGRAM
                case 0x8895: // ELEMENT_ARRAY_BUFFER_BINDING
                case 0x8CA6: // FRAMEBUFFER_BINDING
                case 0x8CA7: // RENDERBUFFER_BINDING
                case 0x8069: // TEXTURE_BINDING_2D
                case 0x85B5: // WebGL 2 GL_VERTEX_ARRAY_BINDING, or WebGL 1 extension OES_vertex_array_object GL_VERTEX_ARRAY_BINDING_OES
                case 0x8514: { // TEXTURE_BINDING_CUBE_MAP
                  ret = 0;
                  break;
                }
                default: {
                  GL.recordError(0x0500); // GL_INVALID_ENUM
                  return;
                }
              }
            } else if (result instanceof Float32Array ||
                       result instanceof Uint32Array ||
                       result instanceof Int32Array ||
                       result instanceof Array) {
              for (var i = 0; i < result.length; ++i) {
                switch (type) {
                  case 'Integer': HEAP32[(((p)+(i*4))>>2)]=result[i];   break;
                  case 'Float':   HEAPF32[(((p)+(i*4))>>2)]=result[i]; break;
                  case 'Boolean': HEAP8[(((p)+(i))>>0)]=result[i] ? 1 : 0;    break;
                  default: throw 'internal glGet error, bad type: ' + type;
                }
              }
              return;
            } else {
              try {
                ret = result.name | 0;
              } catch(e) {
                GL.recordError(0x0500); // GL_INVALID_ENUM
                err('GL_INVALID_ENUM in glGet' + type + 'v: Unknown object returned from WebGL getParameter(' + name_ + ')! (error: ' + e + ')');
                return;
              }
            }
            break;
          default:
            GL.recordError(0x0500); // GL_INVALID_ENUM
            return;
        }
      }
  
      switch (type) {
        case 'Integer64': (tempI64 = [ret>>>0,(tempDouble=ret,(+(Math_abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math_min((+(Math_floor((tempDouble)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math_ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)],HEAP32[((p)>>2)]=tempI64[0],HEAP32[(((p)+(4))>>2)]=tempI64[1]);    break;
        case 'Integer': HEAP32[((p)>>2)]=ret;    break;
        case 'Float':   HEAPF32[((p)>>2)]=ret;  break;
        case 'Boolean': HEAP8[((p)>>0)]=ret ? 1 : 0; break;
        default: throw 'internal glGet error, bad type: ' + type;
      }
    }function _emscripten_glGetBooleanv(name_, p) {
      emscriptenWebGLGet(name_, p, 'Boolean');
    }

  function _emscripten_glGetBufferParameteriv(target, value, data) {
      if (!data) {
        // GLES2 specification does not specify how to behave if data is a null pointer. Since calling this function does not make sense
        // if data == null, issue a GL error to notify user about it.
        GL.recordError(0x0501 /* GL_INVALID_VALUE */);
        return;
      }
      HEAP32[((data)>>2)]=GLctx.getBufferParameter(target, value);
    }

  function _emscripten_glGetError() {
      // First return any GL error generated by the emscripten library_webgl.js interop layer.
      if (GL.lastError) {
        var error = GL.lastError;
        GL.lastError = 0/*GL_NO_ERROR*/;
        return error;
      } else
      { // If there were none, return the GL error from the browser GL context.
        return GLctx.getError();
      }
    }

  function _emscripten_glGetFloatv(name_, p) {
      emscriptenWebGLGet(name_, p, 'Float');
    }

  function _emscripten_glGetFramebufferAttachmentParameteriv(target, attachment, pname, params) {
      var result = GLctx.getFramebufferAttachmentParameter(target, attachment, pname);
      if (result instanceof WebGLRenderbuffer ||
          result instanceof WebGLTexture) {
        result = result.name | 0;
      }
      HEAP32[((params)>>2)]=result;
    }

  function _emscripten_glGetIntegerv(name_, p) {
      emscriptenWebGLGet(name_, p, 'Integer');
    }

  function _emscripten_glGetProgramInfoLog(program, maxLength, length, infoLog) {
      var log = GLctx.getProgramInfoLog(GL.programs[program]);
      if (log === null) log = '(unknown error)';
  
      if (maxLength > 0 && infoLog) {
        var numBytesWrittenExclNull = stringToUTF8(log, infoLog, maxLength);
        if (length) HEAP32[((length)>>2)]=numBytesWrittenExclNull;
      } else {
        if (length) HEAP32[((length)>>2)]=0;
      }
    }

  function _emscripten_glGetProgramiv(program, pname, p) {
      if (!p) {
        // GLES2 specification does not specify how to behave if p is a null pointer. Since calling this function does not make sense
        // if p == null, issue a GL error to notify user about it.
        GL.recordError(0x0501 /* GL_INVALID_VALUE */);
        return;
      }
  
      if (program >= GL.counter) {
        GL.recordError(0x0501 /* GL_INVALID_VALUE */);
        return;
      }
  
      var ptable = GL.programInfos[program];
      if (!ptable) {
        GL.recordError(0x0502 /* GL_INVALID_OPERATION */);
        return;
      }
  
      if (pname == 0x8B84) { // GL_INFO_LOG_LENGTH
        var log = GLctx.getProgramInfoLog(GL.programs[program]);
        if (log === null) log = '(unknown error)';
        HEAP32[((p)>>2)]=log.length + 1;
      } else if (pname == 0x8B87 /* GL_ACTIVE_UNIFORM_MAX_LENGTH */) {
        HEAP32[((p)>>2)]=ptable.maxUniformLength;
      } else if (pname == 0x8B8A /* GL_ACTIVE_ATTRIBUTE_MAX_LENGTH */) {
        if (ptable.maxAttributeLength == -1) {
          program = GL.programs[program];
          var numAttribs = GLctx.getProgramParameter(program, 0x8B89/*GL_ACTIVE_ATTRIBUTES*/);
          ptable.maxAttributeLength = 0; // Spec says if there are no active attribs, 0 must be returned.
          for (var i = 0; i < numAttribs; ++i) {
            var activeAttrib = GLctx.getActiveAttrib(program, i);
            ptable.maxAttributeLength = Math.max(ptable.maxAttributeLength, activeAttrib.name.length+1);
          }
        }
        HEAP32[((p)>>2)]=ptable.maxAttributeLength;
      } else if (pname == 0x8A35 /* GL_ACTIVE_UNIFORM_BLOCK_MAX_NAME_LENGTH */) {
        if (ptable.maxUniformBlockNameLength == -1) {
          program = GL.programs[program];
          var numBlocks = GLctx.getProgramParameter(program, 0x8A36/*GL_ACTIVE_UNIFORM_BLOCKS*/);
          ptable.maxUniformBlockNameLength = 0;
          for (var i = 0; i < numBlocks; ++i) {
            var activeBlockName = GLctx.getActiveUniformBlockName(program, i);
            ptable.maxUniformBlockNameLength = Math.max(ptable.maxUniformBlockNameLength, activeBlockName.length+1);
          }
        }
        HEAP32[((p)>>2)]=ptable.maxUniformBlockNameLength;
      } else {
        HEAP32[((p)>>2)]=GLctx.getProgramParameter(GL.programs[program], pname);
      }
    }

  function _emscripten_glGetQueryObjecti64vEXT(id, pname, params) {
      if (!params) {
        // GLES2 specification does not specify how to behave if params is a null pointer. Since calling this function does not make sense
        // if p == null, issue a GL error to notify user about it.
        GL.recordError(0x0501 /* GL_INVALID_VALUE */);
        return;
      }
      var query = GL.timerQueriesEXT[id];
      var param = GLctx.disjointTimerQueryExt['getQueryObjectEXT'](query, pname);
      var ret;
      if (typeof param == 'boolean') {
        ret = param ? 1 : 0;
      } else {
        ret = param;
      }
      (tempI64 = [ret>>>0,(tempDouble=ret,(+(Math_abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math_min((+(Math_floor((tempDouble)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math_ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)],HEAP32[((params)>>2)]=tempI64[0],HEAP32[(((params)+(4))>>2)]=tempI64[1]);
    }

  function _emscripten_glGetQueryObjectivEXT(id, pname, params) {
      if (!params) {
        // GLES2 specification does not specify how to behave if params is a null pointer. Since calling this function does not make sense
        // if p == null, issue a GL error to notify user about it.
        GL.recordError(0x0501 /* GL_INVALID_VALUE */);
        return;
      }
      var query = GL.timerQueriesEXT[id];
      var param = GLctx.disjointTimerQueryExt['getQueryObjectEXT'](query, pname);
      var ret;
      if (typeof param == 'boolean') {
        ret = param ? 1 : 0;
      } else {
        ret = param;
      }
      HEAP32[((params)>>2)]=ret;
    }

  function _emscripten_glGetQueryObjectui64vEXT(id, pname, params) {
      if (!params) {
        // GLES2 specification does not specify how to behave if params is a null pointer. Since calling this function does not make sense
        // if p == null, issue a GL error to notify user about it.
        GL.recordError(0x0501 /* GL_INVALID_VALUE */);
        return;
      }
      var query = GL.timerQueriesEXT[id];
      var param = GLctx.disjointTimerQueryExt['getQueryObjectEXT'](query, pname);
      var ret;
      if (typeof param == 'boolean') {
        ret = param ? 1 : 0;
      } else {
        ret = param;
      }
      (tempI64 = [ret>>>0,(tempDouble=ret,(+(Math_abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math_min((+(Math_floor((tempDouble)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math_ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)],HEAP32[((params)>>2)]=tempI64[0],HEAP32[(((params)+(4))>>2)]=tempI64[1]);
    }

  function _emscripten_glGetQueryObjectuivEXT(id, pname, params) {
      if (!params) {
        // GLES2 specification does not specify how to behave if params is a null pointer. Since calling this function does not make sense
        // if p == null, issue a GL error to notify user about it.
        GL.recordError(0x0501 /* GL_INVALID_VALUE */);
        return;
      }
      var query = GL.timerQueriesEXT[id];
      var param = GLctx.disjointTimerQueryExt['getQueryObjectEXT'](query, pname);
      var ret;
      if (typeof param == 'boolean') {
        ret = param ? 1 : 0;
      } else {
        ret = param;
      }
      HEAP32[((params)>>2)]=ret;
    }

  function _emscripten_glGetQueryivEXT(target, pname, params) {
      if (!params) {
        // GLES2 specification does not specify how to behave if params is a null pointer. Since calling this function does not make sense
        // if p == null, issue a GL error to notify user about it.
        GL.recordError(0x0501 /* GL_INVALID_VALUE */);
        return;
      }
      HEAP32[((params)>>2)]=GLctx.disjointTimerQueryExt['getQueryEXT'](target, pname);
    }

  function _emscripten_glGetRenderbufferParameteriv(target, pname, params) {
      if (!params) {
        // GLES2 specification does not specify how to behave if params is a null pointer. Since calling this function does not make sense
        // if params == null, issue a GL error to notify user about it.
        GL.recordError(0x0501 /* GL_INVALID_VALUE */);
        return;
      }
      HEAP32[((params)>>2)]=GLctx.getRenderbufferParameter(target, pname);
    }

  function _emscripten_glGetShaderInfoLog(shader, maxLength, length, infoLog) {
      var log = GLctx.getShaderInfoLog(GL.shaders[shader]);
      if (log === null) log = '(unknown error)';
      if (maxLength > 0 && infoLog) {
        var numBytesWrittenExclNull = stringToUTF8(log, infoLog, maxLength);
        if (length) HEAP32[((length)>>2)]=numBytesWrittenExclNull;
      } else {
        if (length) HEAP32[((length)>>2)]=0;
      }
    }

  function _emscripten_glGetShaderPrecisionFormat(shaderType, precisionType, range, precision) {
      var result = GLctx.getShaderPrecisionFormat(shaderType, precisionType);
      HEAP32[((range)>>2)]=result.rangeMin;
      HEAP32[(((range)+(4))>>2)]=result.rangeMax;
      HEAP32[((precision)>>2)]=result.precision;
    }

  function _emscripten_glGetShaderSource(shader, bufSize, length, source) {
      var result = GLctx.getShaderSource(GL.shaders[shader]);
      if (!result) return; // If an error occurs, nothing will be written to length or source.
      if (bufSize > 0 && source) {
        var numBytesWrittenExclNull = stringToUTF8(result, source, bufSize);
        if (length) HEAP32[((length)>>2)]=numBytesWrittenExclNull;
      } else {
        if (length) HEAP32[((length)>>2)]=0;
      }
    }

  function _emscripten_glGetShaderiv(shader, pname, p) {
      if (!p) {
        // GLES2 specification does not specify how to behave if p is a null pointer. Since calling this function does not make sense
        // if p == null, issue a GL error to notify user about it.
        GL.recordError(0x0501 /* GL_INVALID_VALUE */);
        return;
      }
      if (pname == 0x8B84) { // GL_INFO_LOG_LENGTH
        var log = GLctx.getShaderInfoLog(GL.shaders[shader]);
        if (log === null) log = '(unknown error)';
        HEAP32[((p)>>2)]=log.length + 1;
      } else if (pname == 0x8B88) { // GL_SHADER_SOURCE_LENGTH
        var source = GLctx.getShaderSource(GL.shaders[shader]);
        var sourceLength = (source === null || source.length == 0) ? 0 : source.length + 1;
        HEAP32[((p)>>2)]=sourceLength;
      } else {
        HEAP32[((p)>>2)]=GLctx.getShaderParameter(GL.shaders[shader], pname);
      }
    }

  
  function stringToNewUTF8(jsString) {
      var length = lengthBytesUTF8(jsString)+1;
      var cString = _malloc(length);
      stringToUTF8(jsString, cString, length);
      return cString;
    }function _emscripten_glGetString(name_) {
      if (GL.stringCache[name_]) return GL.stringCache[name_];
      var ret;
      switch(name_) {
        case 0x1F03 /* GL_EXTENSIONS */:
          var exts = GLctx.getSupportedExtensions();
          var gl_exts = [];
          for (var i = 0; i < exts.length; ++i) {
            gl_exts.push(exts[i]);
            gl_exts.push("GL_" + exts[i]);
          }
          ret = stringToNewUTF8(gl_exts.join(' '));
          break;
        case 0x1F00 /* GL_VENDOR */:
        case 0x1F01 /* GL_RENDERER */:
        case 0x9245 /* UNMASKED_VENDOR_WEBGL */:
        case 0x9246 /* UNMASKED_RENDERER_WEBGL */:
          var s = GLctx.getParameter(name_);
          if (!s) {
            GL.recordError(0x0500/*GL_INVALID_ENUM*/);
          }
          ret = stringToNewUTF8(s);
          break;
  
        case 0x1F02 /* GL_VERSION */:
          var glVersion = GLctx.getParameter(GLctx.VERSION);
          // return GLES version string corresponding to the version of the WebGL context
          {
            glVersion = 'OpenGL ES 2.0 (' + glVersion + ')';
          }
          ret = stringToNewUTF8(glVersion);
          break;
        case 0x8B8C /* GL_SHADING_LANGUAGE_VERSION */:
          var glslVersion = GLctx.getParameter(GLctx.SHADING_LANGUAGE_VERSION);
          // extract the version number 'N.M' from the string 'WebGL GLSL ES N.M ...'
          var ver_re = /^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/;
          var ver_num = glslVersion.match(ver_re);
          if (ver_num !== null) {
            if (ver_num[1].length == 3) ver_num[1] = ver_num[1] + '0'; // ensure minor version has 2 digits
            glslVersion = 'OpenGL ES GLSL ES ' + ver_num[1] + ' (' + glslVersion + ')';
          }
          ret = stringToNewUTF8(glslVersion);
          break;
        default:
          GL.recordError(0x0500/*GL_INVALID_ENUM*/);
          return 0;
      }
      GL.stringCache[name_] = ret;
      return ret;
    }

  function _emscripten_glGetTexParameterfv(target, pname, params) {
      if (!params) {
        // GLES2 specification does not specify how to behave if params is a null pointer. Since calling this function does not make sense
        // if p == null, issue a GL error to notify user about it.
        GL.recordError(0x0501 /* GL_INVALID_VALUE */);
        return;
      }
      HEAPF32[((params)>>2)]=GLctx.getTexParameter(target, pname);
    }

  function _emscripten_glGetTexParameteriv(target, pname, params) {
      if (!params) {
        // GLES2 specification does not specify how to behave if params is a null pointer. Since calling this function does not make sense
        // if p == null, issue a GL error to notify user about it.
        GL.recordError(0x0501 /* GL_INVALID_VALUE */);
        return;
      }
      HEAP32[((params)>>2)]=GLctx.getTexParameter(target, pname);
    }

  function _emscripten_glGetUniformLocation(program, name) {
      name = UTF8ToString(name);
  
      var arrayIndex = 0;
      // If user passed an array accessor "[index]", parse the array index off the accessor.
      if (name[name.length - 1] == ']') {
        var leftBrace = name.lastIndexOf('[');
        arrayIndex = name[leftBrace+1] != ']' ? parseInt(name.slice(leftBrace + 1)) : 0; // "index]", parseInt will ignore the ']' at the end; but treat "foo[]" as "foo[0]"
        name = name.slice(0, leftBrace);
      }
  
      var uniformInfo = GL.programInfos[program] && GL.programInfos[program].uniforms[name]; // returns pair [ dimension_of_uniform_array, uniform_location ]
      if (uniformInfo && arrayIndex >= 0 && arrayIndex < uniformInfo[0]) { // Check if user asked for an out-of-bounds element, i.e. for 'vec4 colors[3];' user could ask for 'colors[10]' which should return -1.
        return uniformInfo[1] + arrayIndex;
      } else {
        return -1;
      }
    }

  
  function emscriptenWebGLGetUniform(program, location, params, type) {
      if (!params) {
        // GLES2 specification does not specify how to behave if params is a null pointer. Since calling this function does not make sense
        // if params == null, issue a GL error to notify user about it.
        GL.recordError(0x0501 /* GL_INVALID_VALUE */);
        return;
      }
      var data = GLctx.getUniform(GL.programs[program], GL.uniforms[location]);
      if (typeof data == 'number' || typeof data == 'boolean') {
        switch (type) {
          case 'Integer': HEAP32[((params)>>2)]=data; break;
          case 'Float': HEAPF32[((params)>>2)]=data; break;
          default: throw 'internal emscriptenWebGLGetUniform() error, bad type: ' + type;
        }
      } else {
        for (var i = 0; i < data.length; i++) {
          switch (type) {
            case 'Integer': HEAP32[(((params)+(i*4))>>2)]=data[i]; break;
            case 'Float': HEAPF32[(((params)+(i*4))>>2)]=data[i]; break;
            default: throw 'internal emscriptenWebGLGetUniform() error, bad type: ' + type;
          }
        }
      }
    }function _emscripten_glGetUniformfv(program, location, params) {
      emscriptenWebGLGetUniform(program, location, params, 'Float');
    }

  function _emscripten_glGetUniformiv(program, location, params) {
      emscriptenWebGLGetUniform(program, location, params, 'Integer');
    }

  function _emscripten_glGetVertexAttribPointerv(index, pname, pointer) {
      if (!pointer) {
        // GLES2 specification does not specify how to behave if pointer is a null pointer. Since calling this function does not make sense
        // if pointer == null, issue a GL error to notify user about it.
        GL.recordError(0x0501 /* GL_INVALID_VALUE */);
        return;
      }
      HEAP32[((pointer)>>2)]=GLctx.getVertexAttribOffset(index, pname);
    }

  
  function emscriptenWebGLGetVertexAttrib(index, pname, params, type) {
      if (!params) {
        // GLES2 specification does not specify how to behave if params is a null pointer. Since calling this function does not make sense
        // if params == null, issue a GL error to notify user about it.
        GL.recordError(0x0501 /* GL_INVALID_VALUE */);
        return;
      }
      var data = GLctx.getVertexAttrib(index, pname);
      if (pname == 0x889F/*VERTEX_ATTRIB_ARRAY_BUFFER_BINDING*/) {
        HEAP32[((params)>>2)]=data["name"];
      } else if (typeof data == 'number' || typeof data == 'boolean') {
        switch (type) {
          case 'Integer': HEAP32[((params)>>2)]=data; break;
          case 'Float': HEAPF32[((params)>>2)]=data; break;
          case 'FloatToInteger': HEAP32[((params)>>2)]=Math.fround(data); break;
          default: throw 'internal emscriptenWebGLGetVertexAttrib() error, bad type: ' + type;
        }
      } else {
        for (var i = 0; i < data.length; i++) {
          switch (type) {
            case 'Integer': HEAP32[(((params)+(i*4))>>2)]=data[i]; break;
            case 'Float': HEAPF32[(((params)+(i*4))>>2)]=data[i]; break;
            case 'FloatToInteger': HEAP32[(((params)+(i*4))>>2)]=Math.fround(data[i]); break;
            default: throw 'internal emscriptenWebGLGetVertexAttrib() error, bad type: ' + type;
          }
        }
      }
    }function _emscripten_glGetVertexAttribfv(index, pname, params) {
      // N.B. This function may only be called if the vertex attribute was specified using the function glVertexAttrib*f(),
      // otherwise the results are undefined. (GLES3 spec 6.1.12)
      emscriptenWebGLGetVertexAttrib(index, pname, params, 'Float');
    }

  function _emscripten_glGetVertexAttribiv(index, pname, params) {
      // N.B. This function may only be called if the vertex attribute was specified using the function glVertexAttrib*f(),
      // otherwise the results are undefined. (GLES3 spec 6.1.12)
      emscriptenWebGLGetVertexAttrib(index, pname, params, 'FloatToInteger');
    }

  function _emscripten_glHint(x0, x1) { GLctx['hint'](x0, x1) }

  function _emscripten_glIsBuffer(buffer) {
      var b = GL.buffers[buffer];
      if (!b) return 0;
      return GLctx.isBuffer(b);
    }

  function _emscripten_glIsEnabled(x0) { return GLctx['isEnabled'](x0) }

  function _emscripten_glIsFramebuffer(framebuffer) {
      var fb = GL.framebuffers[framebuffer];
      if (!fb) return 0;
      return GLctx.isFramebuffer(fb);
    }

  function _emscripten_glIsProgram(program) {
      program = GL.programs[program];
      if (!program) return 0;
      return GLctx.isProgram(program);
    }

  function _emscripten_glIsQueryEXT(id) {
      var query = GL.timerQueriesEXT[id];
      if (!query) return 0;
      return GLctx.disjointTimerQueryExt['isQueryEXT'](query);
    }

  function _emscripten_glIsRenderbuffer(renderbuffer) {
      var rb = GL.renderbuffers[renderbuffer];
      if (!rb) return 0;
      return GLctx.isRenderbuffer(rb);
    }

  function _emscripten_glIsShader(shader) {
      var s = GL.shaders[shader];
      if (!s) return 0;
      return GLctx.isShader(s);
    }

  function _emscripten_glIsTexture(id) {
      var texture = GL.textures[id];
      if (!texture) return 0;
      return GLctx.isTexture(texture);
    }

  function _emscripten_glIsVertexArrayOES(array) {
  
      var vao = GL.vaos[array];
      if (!vao) return 0;
      return GLctx['isVertexArray'](vao);
    }

  function _emscripten_glLineWidth(x0) { GLctx['lineWidth'](x0) }

  function _emscripten_glLinkProgram(program) {
      GLctx.linkProgram(GL.programs[program]);
      GL.populateUniformTable(program);
    }

  function _emscripten_glPixelStorei(pname, param) {
      if (pname == 0x0cf5 /* GL_UNPACK_ALIGNMENT */) {
        GL.unpackAlignment = param;
      }
      GLctx.pixelStorei(pname, param);
    }

  function _emscripten_glPolygonOffset(x0, x1) { GLctx['polygonOffset'](x0, x1) }

  function _emscripten_glQueryCounterEXT(id, target) {
      GLctx.disjointTimerQueryExt['queryCounterEXT'](GL.timerQueriesEXT[id], target);
    }

  
  
  function __computeUnpackAlignedImageSize(width, height, sizePerPixel, alignment) {
      function roundedToNextMultipleOf(x, y) {
        return (x + y - 1) & -y;
      }
      var plainRowSize = width * sizePerPixel;
      var alignedRowSize = roundedToNextMultipleOf(plainRowSize, alignment);
      return height * alignedRowSize;
    }
  
  var __colorChannelsInGlTextureFormat={6402:1,6406:1,6407:3,6408:4,6409:1,6410:2,35904:3,35906:4};
  
  var __sizeOfGlTextureElementType={5121:1,5123:2,5125:4,5126:4,32819:2,32820:2,33635:2,34042:4,36193:2};function emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, internalFormat) {
      var sizePerPixel = __colorChannelsInGlTextureFormat[format] * __sizeOfGlTextureElementType[type];
      if (!sizePerPixel) {
        GL.recordError(0x0500); // GL_INVALID_ENUM
        return;
      }
      var bytes = __computeUnpackAlignedImageSize(width, height, sizePerPixel, GL.unpackAlignment);
      var end = pixels + bytes;
      switch(type) {
        case 0x1401 /* GL_UNSIGNED_BYTE */:
          return HEAPU8.subarray(pixels, end);
        case 0x1406 /* GL_FLOAT */:
          return HEAPF32.subarray(pixels>>2, end>>2);
        case 0x1405 /* GL_UNSIGNED_INT */:
        case 0x84FA /* GL_UNSIGNED_INT_24_8_WEBGL/GL_UNSIGNED_INT_24_8 */:
          return HEAPU32.subarray(pixels>>2, end>>2);
        case 0x1403 /* GL_UNSIGNED_SHORT */:
        case 0x8363 /* GL_UNSIGNED_SHORT_5_6_5 */:
        case 0x8033 /* GL_UNSIGNED_SHORT_4_4_4_4 */:
        case 0x8034 /* GL_UNSIGNED_SHORT_5_5_5_1 */:
        case 0x8D61 /* GL_HALF_FLOAT_OES */:
          return HEAPU16.subarray(pixels>>1, end>>1);
        default:
          GL.recordError(0x0500); // GL_INVALID_ENUM
      }
    }function _emscripten_glReadPixels(x, y, width, height, format, type, pixels) {
      var pixelData = emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, format);
      if (!pixelData) {
        GL.recordError(0x0500/*GL_INVALID_ENUM*/);
        return;
      }
      GLctx.readPixels(x, y, width, height, format, type, pixelData);
    }

  function _emscripten_glReleaseShaderCompiler() {
      // NOP (as allowed by GLES 2.0 spec)
    }

  function _emscripten_glRenderbufferStorage(x0, x1, x2, x3) { GLctx['renderbufferStorage'](x0, x1, x2, x3) }

  function _emscripten_glSampleCoverage(value, invert) {
      GLctx.sampleCoverage(value, !!invert);
    }

  function _emscripten_glScissor(x0, x1, x2, x3) { GLctx['scissor'](x0, x1, x2, x3) }

  function _emscripten_glShaderBinary() {
      GL.recordError(0x0500/*GL_INVALID_ENUM*/);
    }

  function _emscripten_glShaderSource(shader, count, string, length) {
      var source = GL.getSource(shader, count, string, length);
  
  
      GLctx.shaderSource(GL.shaders[shader], source);
    }

  function _emscripten_glStencilFunc(x0, x1, x2) { GLctx['stencilFunc'](x0, x1, x2) }

  function _emscripten_glStencilFuncSeparate(x0, x1, x2, x3) { GLctx['stencilFuncSeparate'](x0, x1, x2, x3) }

  function _emscripten_glStencilMask(x0) { GLctx['stencilMask'](x0) }

  function _emscripten_glStencilMaskSeparate(x0, x1) { GLctx['stencilMaskSeparate'](x0, x1) }

  function _emscripten_glStencilOp(x0, x1, x2) { GLctx['stencilOp'](x0, x1, x2) }

  function _emscripten_glStencilOpSeparate(x0, x1, x2, x3) { GLctx['stencilOpSeparate'](x0, x1, x2, x3) }

  function _emscripten_glTexImage2D(target, level, internalFormat, width, height, border, format, type, pixels) {
      GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, pixels ? emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, internalFormat) : null);
    }

  function _emscripten_glTexParameterf(x0, x1, x2) { GLctx['texParameterf'](x0, x1, x2) }

  function _emscripten_glTexParameterfv(target, pname, params) {
      var param = HEAPF32[((params)>>2)];
      GLctx.texParameterf(target, pname, param);
    }

  function _emscripten_glTexParameteri(x0, x1, x2) { GLctx['texParameteri'](x0, x1, x2) }

  function _emscripten_glTexParameteriv(target, pname, params) {
      var param = HEAP32[((params)>>2)];
      GLctx.texParameteri(target, pname, param);
    }

  function _emscripten_glTexSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixels) {
      var pixelData = null;
      if (pixels) pixelData = emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, 0);
      GLctx.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixelData);
    }

  function _emscripten_glUniform1f(location, v0) {
      GLctx.uniform1f(GL.uniforms[location], v0);
    }

  function _emscripten_glUniform1fv(location, count, value) {
  
  
      if (count <= GL.MINI_TEMP_BUFFER_SIZE) {
        // avoid allocation when uploading few enough uniforms
        var view = GL.miniTempBufferViews[count-1];
        for (var i = 0; i < count; ++i) {
          view[i] = HEAPF32[(((value)+(4*i))>>2)];
        }
      } else
      {
        var view = HEAPF32.subarray((value)>>2,(value+count*4)>>2);
      }
      GLctx.uniform1fv(GL.uniforms[location], view);
    }

  function _emscripten_glUniform1i(location, v0) {
      GLctx.uniform1i(GL.uniforms[location], v0);
    }

  function _emscripten_glUniform1iv(location, count, value) {
  
  
      GLctx.uniform1iv(GL.uniforms[location], HEAP32.subarray((value)>>2,(value+count*4)>>2));
    }

  function _emscripten_glUniform2f(location, v0, v1) {
      GLctx.uniform2f(GL.uniforms[location], v0, v1);
    }

  function _emscripten_glUniform2fv(location, count, value) {
  
  
      if (2*count <= GL.MINI_TEMP_BUFFER_SIZE) {
        // avoid allocation when uploading few enough uniforms
        var view = GL.miniTempBufferViews[2*count-1];
        for (var i = 0; i < 2*count; i += 2) {
          view[i] = HEAPF32[(((value)+(4*i))>>2)];
          view[i+1] = HEAPF32[(((value)+(4*i+4))>>2)];
        }
      } else
      {
        var view = HEAPF32.subarray((value)>>2,(value+count*8)>>2);
      }
      GLctx.uniform2fv(GL.uniforms[location], view);
    }

  function _emscripten_glUniform2i(location, v0, v1) {
      GLctx.uniform2i(GL.uniforms[location], v0, v1);
    }

  function _emscripten_glUniform2iv(location, count, value) {
  
  
      GLctx.uniform2iv(GL.uniforms[location], HEAP32.subarray((value)>>2,(value+count*8)>>2));
    }

  function _emscripten_glUniform3f(location, v0, v1, v2) {
      GLctx.uniform3f(GL.uniforms[location], v0, v1, v2);
    }

  function _emscripten_glUniform3fv(location, count, value) {
  
  
      if (3*count <= GL.MINI_TEMP_BUFFER_SIZE) {
        // avoid allocation when uploading few enough uniforms
        var view = GL.miniTempBufferViews[3*count-1];
        for (var i = 0; i < 3*count; i += 3) {
          view[i] = HEAPF32[(((value)+(4*i))>>2)];
          view[i+1] = HEAPF32[(((value)+(4*i+4))>>2)];
          view[i+2] = HEAPF32[(((value)+(4*i+8))>>2)];
        }
      } else
      {
        var view = HEAPF32.subarray((value)>>2,(value+count*12)>>2);
      }
      GLctx.uniform3fv(GL.uniforms[location], view);
    }

  function _emscripten_glUniform3i(location, v0, v1, v2) {
      GLctx.uniform3i(GL.uniforms[location], v0, v1, v2);
    }

  function _emscripten_glUniform3iv(location, count, value) {
  
  
      GLctx.uniform3iv(GL.uniforms[location], HEAP32.subarray((value)>>2,(value+count*12)>>2));
    }

  function _emscripten_glUniform4f(location, v0, v1, v2, v3) {
      GLctx.uniform4f(GL.uniforms[location], v0, v1, v2, v3);
    }

  function _emscripten_glUniform4fv(location, count, value) {
  
  
      if (4*count <= GL.MINI_TEMP_BUFFER_SIZE) {
        // avoid allocation when uploading few enough uniforms
        var view = GL.miniTempBufferViews[4*count-1];
        for (var i = 0; i < 4*count; i += 4) {
          view[i] = HEAPF32[(((value)+(4*i))>>2)];
          view[i+1] = HEAPF32[(((value)+(4*i+4))>>2)];
          view[i+2] = HEAPF32[(((value)+(4*i+8))>>2)];
          view[i+3] = HEAPF32[(((value)+(4*i+12))>>2)];
        }
      } else
      {
        var view = HEAPF32.subarray((value)>>2,(value+count*16)>>2);
      }
      GLctx.uniform4fv(GL.uniforms[location], view);
    }

  function _emscripten_glUniform4i(location, v0, v1, v2, v3) {
      GLctx.uniform4i(GL.uniforms[location], v0, v1, v2, v3);
    }

  function _emscripten_glUniform4iv(location, count, value) {
  
  
      GLctx.uniform4iv(GL.uniforms[location], HEAP32.subarray((value)>>2,(value+count*16)>>2));
    }

  function _emscripten_glUniformMatrix2fv(location, count, transpose, value) {
  
  
      if (4*count <= GL.MINI_TEMP_BUFFER_SIZE) {
        // avoid allocation when uploading few enough uniforms
        var view = GL.miniTempBufferViews[4*count-1];
        for (var i = 0; i < 4*count; i += 4) {
          view[i] = HEAPF32[(((value)+(4*i))>>2)];
          view[i+1] = HEAPF32[(((value)+(4*i+4))>>2)];
          view[i+2] = HEAPF32[(((value)+(4*i+8))>>2)];
          view[i+3] = HEAPF32[(((value)+(4*i+12))>>2)];
        }
      } else
      {
        var view = HEAPF32.subarray((value)>>2,(value+count*16)>>2);
      }
      GLctx.uniformMatrix2fv(GL.uniforms[location], !!transpose, view);
    }

  function _emscripten_glUniformMatrix3fv(location, count, transpose, value) {
  
  
      if (9*count <= GL.MINI_TEMP_BUFFER_SIZE) {
        // avoid allocation when uploading few enough uniforms
        var view = GL.miniTempBufferViews[9*count-1];
        for (var i = 0; i < 9*count; i += 9) {
          view[i] = HEAPF32[(((value)+(4*i))>>2)];
          view[i+1] = HEAPF32[(((value)+(4*i+4))>>2)];
          view[i+2] = HEAPF32[(((value)+(4*i+8))>>2)];
          view[i+3] = HEAPF32[(((value)+(4*i+12))>>2)];
          view[i+4] = HEAPF32[(((value)+(4*i+16))>>2)];
          view[i+5] = HEAPF32[(((value)+(4*i+20))>>2)];
          view[i+6] = HEAPF32[(((value)+(4*i+24))>>2)];
          view[i+7] = HEAPF32[(((value)+(4*i+28))>>2)];
          view[i+8] = HEAPF32[(((value)+(4*i+32))>>2)];
        }
      } else
      {
        var view = HEAPF32.subarray((value)>>2,(value+count*36)>>2);
      }
      GLctx.uniformMatrix3fv(GL.uniforms[location], !!transpose, view);
    }

  function _emscripten_glUniformMatrix4fv(location, count, transpose, value) {
  
  
      if (16*count <= GL.MINI_TEMP_BUFFER_SIZE) {
        // avoid allocation when uploading few enough uniforms
        var view = GL.miniTempBufferViews[16*count-1];
        for (var i = 0; i < 16*count; i += 16) {
          view[i] = HEAPF32[(((value)+(4*i))>>2)];
          view[i+1] = HEAPF32[(((value)+(4*i+4))>>2)];
          view[i+2] = HEAPF32[(((value)+(4*i+8))>>2)];
          view[i+3] = HEAPF32[(((value)+(4*i+12))>>2)];
          view[i+4] = HEAPF32[(((value)+(4*i+16))>>2)];
          view[i+5] = HEAPF32[(((value)+(4*i+20))>>2)];
          view[i+6] = HEAPF32[(((value)+(4*i+24))>>2)];
          view[i+7] = HEAPF32[(((value)+(4*i+28))>>2)];
          view[i+8] = HEAPF32[(((value)+(4*i+32))>>2)];
          view[i+9] = HEAPF32[(((value)+(4*i+36))>>2)];
          view[i+10] = HEAPF32[(((value)+(4*i+40))>>2)];
          view[i+11] = HEAPF32[(((value)+(4*i+44))>>2)];
          view[i+12] = HEAPF32[(((value)+(4*i+48))>>2)];
          view[i+13] = HEAPF32[(((value)+(4*i+52))>>2)];
          view[i+14] = HEAPF32[(((value)+(4*i+56))>>2)];
          view[i+15] = HEAPF32[(((value)+(4*i+60))>>2)];
        }
      } else
      {
        var view = HEAPF32.subarray((value)>>2,(value+count*64)>>2);
      }
      GLctx.uniformMatrix4fv(GL.uniforms[location], !!transpose, view);
    }

  function _emscripten_glUseProgram(program) {
      GLctx.useProgram(GL.programs[program]);
    }

  function _emscripten_glValidateProgram(program) {
      GLctx.validateProgram(GL.programs[program]);
    }

  function _emscripten_glVertexAttrib1f(x0, x1) { GLctx['vertexAttrib1f'](x0, x1) }

  function _emscripten_glVertexAttrib1fv(index, v) {
  
      GLctx.vertexAttrib1f(index, HEAPF32[v>>2]);
    }

  function _emscripten_glVertexAttrib2f(x0, x1, x2) { GLctx['vertexAttrib2f'](x0, x1, x2) }

  function _emscripten_glVertexAttrib2fv(index, v) {
  
      GLctx.vertexAttrib2f(index, HEAPF32[v>>2], HEAPF32[v+4>>2]);
    }

  function _emscripten_glVertexAttrib3f(x0, x1, x2, x3) { GLctx['vertexAttrib3f'](x0, x1, x2, x3) }

  function _emscripten_glVertexAttrib3fv(index, v) {
  
      GLctx.vertexAttrib3f(index, HEAPF32[v>>2], HEAPF32[v+4>>2], HEAPF32[v+8>>2]);
    }

  function _emscripten_glVertexAttrib4f(x0, x1, x2, x3, x4) { GLctx['vertexAttrib4f'](x0, x1, x2, x3, x4) }

  function _emscripten_glVertexAttrib4fv(index, v) {
  
      GLctx.vertexAttrib4f(index, HEAPF32[v>>2], HEAPF32[v+4>>2], HEAPF32[v+8>>2], HEAPF32[v+12>>2]);
    }

  function _emscripten_glVertexAttribDivisorANGLE(index, divisor) {
      GLctx['vertexAttribDivisor'](index, divisor);
    }

  function _emscripten_glVertexAttribPointer(index, size, type, normalized, stride, ptr) {
      GLctx.vertexAttribPointer(index, size, type, !!normalized, stride, ptr);
    }

  function _emscripten_glViewport(x0, x1, x2, x3) { GLctx['viewport'](x0, x1, x2, x3) }

  
  function __emscripten_do_request_fullscreen(target, strategy) {
      if (typeof JSEvents.fullscreenEnabled() === 'undefined') return -1;
      if (!JSEvents.fullscreenEnabled()) return -3;
      if (!target) target = '#canvas';
      target = __findEventTarget(target);
      if (!target) return -4;
  
      if (!target.requestFullscreen && !target.msRequestFullscreen && !target.mozRequestFullScreen && !target.mozRequestFullscreen && !target.webkitRequestFullscreen) {
        return -3;
      }
  
      var canPerformRequests = JSEvents.canPerformEventHandlerRequests();
  
      // Queue this function call if we're not currently in an event handler and the user saw it appropriate to do so.
      if (!canPerformRequests) {
        if (strategy.deferUntilInEventHandler) {
          JSEvents.deferCall(_JSEvents_requestFullscreen, 1 /* priority over pointer lock */, [target, strategy]);
          return 1;
        } else {
          return -2;
        }
      }
  
      return _JSEvents_requestFullscreen(target, strategy);
    }function _emscripten_request_fullscreen_strategy(target, deferUntilInEventHandler, fullscreenStrategy) {
      var strategy = {};
      strategy.scaleMode = HEAP32[((fullscreenStrategy)>>2)];
      strategy.canvasResolutionScaleMode = HEAP32[(((fullscreenStrategy)+(4))>>2)];
      strategy.filteringMode = HEAP32[(((fullscreenStrategy)+(8))>>2)];
      strategy.deferUntilInEventHandler = deferUntilInEventHandler;
      strategy.canvasResizedCallback = HEAP32[(((fullscreenStrategy)+(12))>>2)];
      strategy.canvasResizedCallbackUserData = HEAP32[(((fullscreenStrategy)+(16))>>2)];
      __currentFullscreenStrategy = strategy;
  
      return __emscripten_do_request_fullscreen(target, strategy);
    }

  function _emscripten_request_pointerlock(target, deferUntilInEventHandler) {
      if (!target) target = '#canvas';
      target = __findEventTarget(target);
      if (!target) return -4;
      if (!target.requestPointerLock && !target.mozRequestPointerLock && !target.webkitRequestPointerLock && !target.msRequestPointerLock) {
        return -1;
      }
  
      var canPerformRequests = JSEvents.canPerformEventHandlerRequests();
  
      // Queue this function call if we're not currently in an event handler and the user saw it appropriate to do so.
      if (!canPerformRequests) {
        if (deferUntilInEventHandler) {
          JSEvents.deferCall(__requestPointerLock, 2 /* priority below fullscreen */, [target]);
          return 1;
        } else {
          return -2;
        }
      }
  
      return __requestPointerLock(target);
    }

  
  function abortOnCannotGrowMemory(requestedSize) {
      abort('Cannot enlarge memory arrays to size ' + requestedSize + ' bytes (OOM). Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value ' + HEAP8.length + ', (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ');
    }function _emscripten_resize_heap(requestedSize) {
      abortOnCannotGrowMemory(requestedSize);
    }

  function _emscripten_sample_gamepad_data() {
      return (JSEvents.lastGamepadState = (navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : null)))
        ? 0 : -1;
    }

  
  function __registerFocusEventCallback(target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) {
      if (!JSEvents.focusEvent) JSEvents.focusEvent = _malloc( 256 );
  
      var focusEventHandlerFunc = function(event) {
        var e = event || window.event;
  
        var nodeName = JSEvents.getNodeNameForTarget(e.target);
        var id = e.target.id ? e.target.id : '';
  
        var focusEvent = JSEvents.focusEvent;
        stringToUTF8(nodeName, focusEvent + 0, 128);
        stringToUTF8(id, focusEvent + 128, 128);
  
        if (dynCall_iiii(callbackfunc, eventTypeId, focusEvent, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target: __findEventTarget(target),
        allowsDeferredCalls: false,
        eventTypeString: eventTypeString,
        callbackfunc: callbackfunc,
        handlerFunc: focusEventHandlerFunc,
        useCapture: useCapture
      };
      JSEvents.registerOrRemoveHandler(eventHandler);
    }function _emscripten_set_blur_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
      __registerFocusEventCallback(target, userData, useCapture, callbackfunc, 12, "blur", targetThread);
      return 0;
    }


  function _emscripten_set_element_css_size(target, width, height) {
      target = target ? __findEventTarget(target) : Module['canvas'];
      if (!target) return -4;
  
      target.style.width = width + "px";
      target.style.height = height + "px";
  
      return 0;
    }

  function _emscripten_set_focus_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
      __registerFocusEventCallback(target, userData, useCapture, callbackfunc, 13, "focus", targetThread);
      return 0;
    }

  
  
  function __fillFullscreenChangeEventData(eventStruct, e) {
      var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
      var isFullscreen = !!fullscreenElement;
      HEAP32[((eventStruct)>>2)]=isFullscreen;
      HEAP32[(((eventStruct)+(4))>>2)]=JSEvents.fullscreenEnabled();
      // If transitioning to fullscreen, report info about the element that is now fullscreen.
      // If transitioning to windowed mode, report info about the element that just was fullscreen.
      var reportedElement = isFullscreen ? fullscreenElement : JSEvents.previousFullscreenElement;
      var nodeName = JSEvents.getNodeNameForTarget(reportedElement);
      var id = (reportedElement && reportedElement.id) ? reportedElement.id : '';
      stringToUTF8(nodeName, eventStruct + 8, 128);
      stringToUTF8(id, eventStruct + 136, 128);
      HEAP32[(((eventStruct)+(264))>>2)]=reportedElement ? reportedElement.clientWidth : 0;
      HEAP32[(((eventStruct)+(268))>>2)]=reportedElement ? reportedElement.clientHeight : 0;
      HEAP32[(((eventStruct)+(272))>>2)]=screen.width;
      HEAP32[(((eventStruct)+(276))>>2)]=screen.height;
      if (isFullscreen) {
        JSEvents.previousFullscreenElement = fullscreenElement;
      }
    }function __registerFullscreenChangeEventCallback(target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) {
      if (!JSEvents.fullscreenChangeEvent) JSEvents.fullscreenChangeEvent = _malloc( 280 );
  
      var fullscreenChangeEventhandlerFunc = function(event) {
        var e = event || window.event;
  
        var fullscreenChangeEvent = JSEvents.fullscreenChangeEvent;
  
        __fillFullscreenChangeEventData(fullscreenChangeEvent, e);
  
        if (dynCall_iiii(callbackfunc, eventTypeId, fullscreenChangeEvent, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target: target,
        allowsDeferredCalls: false,
        eventTypeString: eventTypeString,
        callbackfunc: callbackfunc,
        handlerFunc: fullscreenChangeEventhandlerFunc,
        useCapture: useCapture
      };
      JSEvents.registerOrRemoveHandler(eventHandler);
    }function _emscripten_set_fullscreenchange_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
      if (typeof JSEvents.fullscreenEnabled() === 'undefined') return -1;
      target = target ? __findEventTarget(target) : __specialEventTargets[1];
      if (!target) return -4;
      __registerFullscreenChangeEventCallback(target, userData, useCapture, callbackfunc, 19, "fullscreenchange", targetThread);
      __registerFullscreenChangeEventCallback(target, userData, useCapture, callbackfunc, 19, "mozfullscreenchange", targetThread);
      __registerFullscreenChangeEventCallback(target, userData, useCapture, callbackfunc, 19, "webkitfullscreenchange", targetThread);
      __registerFullscreenChangeEventCallback(target, userData, useCapture, callbackfunc, 19, "msfullscreenchange", targetThread);
      return 0;
    }

  
  function __registerGamepadEventCallback(target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) {
      if (!JSEvents.gamepadEvent) JSEvents.gamepadEvent = _malloc( 1432 );
  
      var gamepadEventHandlerFunc = function(event) {
        var e = event || window.event;
  
        var gamepadEvent = JSEvents.gamepadEvent;
        __fillGamepadEventData(gamepadEvent, e.gamepad);
  
        if (dynCall_iiii(callbackfunc, eventTypeId, gamepadEvent, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target: __findEventTarget(target),
        allowsDeferredCalls: true,
        eventTypeString: eventTypeString,
        callbackfunc: callbackfunc,
        handlerFunc: gamepadEventHandlerFunc,
        useCapture: useCapture
      };
      JSEvents.registerOrRemoveHandler(eventHandler);
    }function _emscripten_set_gamepadconnected_callback_on_thread(userData, useCapture, callbackfunc, targetThread) {
      if (!navigator.getGamepads && !navigator.webkitGetGamepads) return -1;
      __registerGamepadEventCallback(2, userData, useCapture, callbackfunc, 26, "gamepadconnected", targetThread);
      return 0;
    }

  function _emscripten_set_gamepaddisconnected_callback_on_thread(userData, useCapture, callbackfunc, targetThread) {
      if (!navigator.getGamepads && !navigator.webkitGetGamepads) return -1;
      __registerGamepadEventCallback(2, userData, useCapture, callbackfunc, 27, "gamepaddisconnected", targetThread);
      return 0;
    }

  function _emscripten_set_interval(cb, msecs, userData) {
      return setInterval(function() {
        dynCall_vi(cb, userData)
      }, msecs);
    }

  
  function __registerKeyEventCallback(target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) {
      if (!JSEvents.keyEvent) JSEvents.keyEvent = _malloc( 164 );
  
      var keyEventHandlerFunc = function(event) {
        var e = event || window.event;
  
        var keyEventData = JSEvents.keyEvent;
        stringToUTF8(e.key ? e.key : "", keyEventData + 0, 32);
        stringToUTF8(e.code ? e.code : "", keyEventData + 32, 32);
        HEAP32[(((keyEventData)+(64))>>2)]=e.location;
        HEAP32[(((keyEventData)+(68))>>2)]=e.ctrlKey;
        HEAP32[(((keyEventData)+(72))>>2)]=e.shiftKey;
        HEAP32[(((keyEventData)+(76))>>2)]=e.altKey;
        HEAP32[(((keyEventData)+(80))>>2)]=e.metaKey;
        HEAP32[(((keyEventData)+(84))>>2)]=e.repeat;
        stringToUTF8(e.locale ? e.locale : "", keyEventData + 88, 32);
        stringToUTF8(e.char ? e.char : "", keyEventData + 120, 32);
        HEAP32[(((keyEventData)+(152))>>2)]=e.charCode;
        HEAP32[(((keyEventData)+(156))>>2)]=e.keyCode;
        HEAP32[(((keyEventData)+(160))>>2)]=e.which;
  
        if (dynCall_iiii(callbackfunc, eventTypeId, keyEventData, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target: __findEventTarget(target),
        allowsDeferredCalls: JSEvents.isInternetExplorer() ? false : true, // MSIE doesn't allow fullscreen and pointerlock requests from key handlers, others do.
        eventTypeString: eventTypeString,
        callbackfunc: callbackfunc,
        handlerFunc: keyEventHandlerFunc,
        useCapture: useCapture
      };
      JSEvents.registerOrRemoveHandler(eventHandler);
    }function _emscripten_set_keydown_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
      __registerKeyEventCallback(target, userData, useCapture, callbackfunc, 2, "keydown", targetThread);
      return 0;
    }

  function _emscripten_set_keypress_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
      __registerKeyEventCallback(target, userData, useCapture, callbackfunc, 1, "keypress", targetThread);
      return 0;
    }

  function _emscripten_set_keyup_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
      __registerKeyEventCallback(target, userData, useCapture, callbackfunc, 3, "keyup", targetThread);
      return 0;
    }


  
  
  function __fillMouseEventData(eventStruct, e, target) {
      HEAPF64[((eventStruct)>>3)]=JSEvents.tick();
      HEAP32[(((eventStruct)+(8))>>2)]=e.screenX;
      HEAP32[(((eventStruct)+(12))>>2)]=e.screenY;
      HEAP32[(((eventStruct)+(16))>>2)]=e.clientX;
      HEAP32[(((eventStruct)+(20))>>2)]=e.clientY;
      HEAP32[(((eventStruct)+(24))>>2)]=e.ctrlKey;
      HEAP32[(((eventStruct)+(28))>>2)]=e.shiftKey;
      HEAP32[(((eventStruct)+(32))>>2)]=e.altKey;
      HEAP32[(((eventStruct)+(36))>>2)]=e.metaKey;
      HEAP16[(((eventStruct)+(40))>>1)]=e.button;
      HEAP16[(((eventStruct)+(42))>>1)]=e.buttons;
      HEAP32[(((eventStruct)+(44))>>2)]=e["movementX"] || e["mozMovementX"] || e["webkitMovementX"] || (e.screenX-JSEvents.previousScreenX);
      HEAP32[(((eventStruct)+(48))>>2)]=e["movementY"] || e["mozMovementY"] || e["webkitMovementY"] || (e.screenY-JSEvents.previousScreenY);
  
      if (Module['canvas']) {
        var rect = Module['canvas'].getBoundingClientRect();
        HEAP32[(((eventStruct)+(60))>>2)]=e.clientX - rect.left;
        HEAP32[(((eventStruct)+(64))>>2)]=e.clientY - rect.top;
      } else { // Canvas is not initialized, return 0.
        HEAP32[(((eventStruct)+(60))>>2)]=0;
        HEAP32[(((eventStruct)+(64))>>2)]=0;
      }
      if (target) {
        var rect = JSEvents.getBoundingClientRectOrZeros(target);
        HEAP32[(((eventStruct)+(52))>>2)]=e.clientX - rect.left;
        HEAP32[(((eventStruct)+(56))>>2)]=e.clientY - rect.top;
      } else { // No specific target passed, return 0.
        HEAP32[(((eventStruct)+(52))>>2)]=0;
        HEAP32[(((eventStruct)+(56))>>2)]=0;
      }
      // wheel and mousewheel events contain wrong screenX/screenY on chrome/opera
        // https://github.com/emscripten-core/emscripten/pull/4997
      // https://bugs.chromium.org/p/chromium/issues/detail?id=699956
      if (e.type !== 'wheel' && e.type !== 'mousewheel') {
        JSEvents.previousScreenX = e.screenX;
        JSEvents.previousScreenY = e.screenY;
      }
    }function __registerMouseEventCallback(target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) {
      if (!JSEvents.mouseEvent) JSEvents.mouseEvent = _malloc( 72 );
      target = __findEventTarget(target);
  
      var mouseEventHandlerFunc = function(event) {
        var e = event || window.event;
  
        // TODO: Make this access thread safe, or this could update live while app is reading it.
        __fillMouseEventData(JSEvents.mouseEvent, e, target);
  
        if (dynCall_iiii(callbackfunc, eventTypeId, JSEvents.mouseEvent, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target: target,
        allowsDeferredCalls: eventTypeString != 'mousemove' && eventTypeString != 'mouseenter' && eventTypeString != 'mouseleave', // Mouse move events do not allow fullscreen/pointer lock requests to be handled in them!
        eventTypeString: eventTypeString,
        callbackfunc: callbackfunc,
        handlerFunc: mouseEventHandlerFunc,
        useCapture: useCapture
      };
      // In IE, mousedown events don't either allow deferred calls to be run!
      if (JSEvents.isInternetExplorer() && eventTypeString == 'mousedown') eventHandler.allowsDeferredCalls = false;
      JSEvents.registerOrRemoveHandler(eventHandler);
    }function _emscripten_set_mousedown_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
      __registerMouseEventCallback(target, userData, useCapture, callbackfunc, 5, "mousedown", targetThread);
      return 0;
    }

  function _emscripten_set_mouseenter_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
      __registerMouseEventCallback(target, userData, useCapture, callbackfunc, 33, "mouseenter", targetThread);
      return 0;
    }

  function _emscripten_set_mouseleave_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
      __registerMouseEventCallback(target, userData, useCapture, callbackfunc, 34, "mouseleave", targetThread);
      return 0;
    }

  function _emscripten_set_mousemove_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
      __registerMouseEventCallback(target, userData, useCapture, callbackfunc, 8, "mousemove", targetThread);
      return 0;
    }

  function _emscripten_set_mouseup_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
      __registerMouseEventCallback(target, userData, useCapture, callbackfunc, 6, "mouseup", targetThread);
      return 0;
    }

  
  
  function __fillPointerlockChangeEventData(eventStruct, e) {
      var pointerLockElement = document.pointerLockElement || document.mozPointerLockElement || document.webkitPointerLockElement || document.msPointerLockElement;
      var isPointerlocked = !!pointerLockElement;
      HEAP32[((eventStruct)>>2)]=isPointerlocked;
      var nodeName = JSEvents.getNodeNameForTarget(pointerLockElement);
      var id = (pointerLockElement && pointerLockElement.id) ? pointerLockElement.id : '';
      stringToUTF8(nodeName, eventStruct + 4, 128);
      stringToUTF8(id, eventStruct + 132, 128);
    }function __registerPointerlockChangeEventCallback(target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) {
      if (!JSEvents.pointerlockChangeEvent) JSEvents.pointerlockChangeEvent = _malloc( 260 );
  
      var pointerlockChangeEventHandlerFunc = function(event) {
        var e = event || window.event;
  
        var pointerlockChangeEvent = JSEvents.pointerlockChangeEvent;
        __fillPointerlockChangeEventData(pointerlockChangeEvent, e);
  
        if (dynCall_iiii(callbackfunc, eventTypeId, pointerlockChangeEvent, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target: target,
        allowsDeferredCalls: false,
        eventTypeString: eventTypeString,
        callbackfunc: callbackfunc,
        handlerFunc: pointerlockChangeEventHandlerFunc,
        useCapture: useCapture
      };
      JSEvents.registerOrRemoveHandler(eventHandler);
    }function _emscripten_set_pointerlockchange_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
      // TODO: Currently not supported in pthreads or in --proxy-to-worker mode. (In pthreads mode, document object is not defined)
      if (!document || !document.body || (!document.body.requestPointerLock && !document.body.mozRequestPointerLock && !document.body.webkitRequestPointerLock && !document.body.msRequestPointerLock)) {
        return -1;
      }
  
      target = target ? __findEventTarget(target) : __specialEventTargets[1]; // Pointer lock change events need to be captured from 'document' by default instead of 'window'
      if (!target) return -4;
      __registerPointerlockChangeEventCallback(target, userData, useCapture, callbackfunc, 20, "pointerlockchange", targetThread);
      __registerPointerlockChangeEventCallback(target, userData, useCapture, callbackfunc, 20, "mozpointerlockchange", targetThread);
      __registerPointerlockChangeEventCallback(target, userData, useCapture, callbackfunc, 20, "webkitpointerlockchange", targetThread);
      __registerPointerlockChangeEventCallback(target, userData, useCapture, callbackfunc, 20, "mspointerlockchange", targetThread);
      return 0;
    }

  
  function __registerUiEventCallback(target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) {
      if (!JSEvents.uiEvent) JSEvents.uiEvent = _malloc( 36 );
  
      if (eventTypeString == "scroll" && !target) {
        target = document; // By default read scroll events on document rather than window.
      } else {
        target = __findEventTarget(target);
      }
  
      var uiEventHandlerFunc = function(event) {
        var e = event || window.event;
        if (e.target != target) {
          // Never take ui events such as scroll via a 'bubbled' route, but always from the direct element that
          // was targeted. Otherwise e.g. if app logs a message in response to a page scroll, the Emscripten log
          // message box could cause to scroll, generating a new (bubbled) scroll message, causing a new log print,
          // causing a new scroll, etc..
          return;
        }
        var scrollPos = JSEvents.pageScrollPos();
  
        var uiEvent = JSEvents.uiEvent;
        HEAP32[((uiEvent)>>2)]=e.detail;
        HEAP32[(((uiEvent)+(4))>>2)]=document.body.clientWidth;
        HEAP32[(((uiEvent)+(8))>>2)]=document.body.clientHeight;
        HEAP32[(((uiEvent)+(12))>>2)]=window.innerWidth;
        HEAP32[(((uiEvent)+(16))>>2)]=window.innerHeight;
        HEAP32[(((uiEvent)+(20))>>2)]=window.outerWidth;
        HEAP32[(((uiEvent)+(24))>>2)]=window.outerHeight;
        HEAP32[(((uiEvent)+(28))>>2)]=scrollPos[0];
        HEAP32[(((uiEvent)+(32))>>2)]=scrollPos[1];
        if (dynCall_iiii(callbackfunc, eventTypeId, uiEvent, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target: target,
        allowsDeferredCalls: false, // Neither scroll or resize events allow running requests inside them.
        eventTypeString: eventTypeString,
        callbackfunc: callbackfunc,
        handlerFunc: uiEventHandlerFunc,
        useCapture: useCapture
      };
      JSEvents.registerOrRemoveHandler(eventHandler);
    }function _emscripten_set_resize_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
      __registerUiEventCallback(target, userData, useCapture, callbackfunc, 10, "resize", targetThread);
      return 0;
    }

  function _emscripten_set_timeout(cb, msecs, userData) {
      return setTimeout(function() {
        dynCall_vi(cb, userData);
      }, msecs);
    }

  
  function __registerTouchEventCallback(target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) {
      if (!JSEvents.touchEvent) JSEvents.touchEvent = _malloc( 1684 );
  
      target = __findEventTarget(target);
  
      var touchEventHandlerFunc = function(event) {
        var e = event || window.event;
  
        var touches = {};
        for(var i = 0; i < e.touches.length; ++i) {
          var touch = e.touches[i];
          touches[touch.identifier] = touch;
        }
        for(var i = 0; i < e.changedTouches.length; ++i) {
          var touch = e.changedTouches[i];
          touches[touch.identifier] = touch;
          touch.changed = true;
        }
        for(var i = 0; i < e.targetTouches.length; ++i) {
          var touch = e.targetTouches[i];
          touches[touch.identifier].onTarget = true;
        }
  
        var touchEvent = JSEvents.touchEvent;
        var ptr = touchEvent;
        HEAP32[(((ptr)+(4))>>2)]=e.ctrlKey;
        HEAP32[(((ptr)+(8))>>2)]=e.shiftKey;
        HEAP32[(((ptr)+(12))>>2)]=e.altKey;
        HEAP32[(((ptr)+(16))>>2)]=e.metaKey;
        ptr += 20; // Advance to the start of the touch array.
        var canvasRect = Module['canvas'] ? Module['canvas'].getBoundingClientRect() : undefined;
        var targetRect = JSEvents.getBoundingClientRectOrZeros(target);
        var numTouches = 0;
        for(var i in touches) {
          var t = touches[i];
          HEAP32[((ptr)>>2)]=t.identifier;
          HEAP32[(((ptr)+(4))>>2)]=t.screenX;
          HEAP32[(((ptr)+(8))>>2)]=t.screenY;
          HEAP32[(((ptr)+(12))>>2)]=t.clientX;
          HEAP32[(((ptr)+(16))>>2)]=t.clientY;
          HEAP32[(((ptr)+(20))>>2)]=t.pageX;
          HEAP32[(((ptr)+(24))>>2)]=t.pageY;
          HEAP32[(((ptr)+(28))>>2)]=t.changed;
          HEAP32[(((ptr)+(32))>>2)]=t.onTarget;
          if (canvasRect) {
            HEAP32[(((ptr)+(44))>>2)]=t.clientX - canvasRect.left;
            HEAP32[(((ptr)+(48))>>2)]=t.clientY - canvasRect.top;
          } else {
            HEAP32[(((ptr)+(44))>>2)]=0;
            HEAP32[(((ptr)+(48))>>2)]=0;            
          }
          HEAP32[(((ptr)+(36))>>2)]=t.clientX - targetRect.left;
          HEAP32[(((ptr)+(40))>>2)]=t.clientY - targetRect.top;
  
          ptr += 52;
  
          if (++numTouches >= 32) {
            break;
          }
        }
        HEAP32[((touchEvent)>>2)]=numTouches;
  
        if (dynCall_iiii(callbackfunc, eventTypeId, touchEvent, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target: target,
        allowsDeferredCalls: eventTypeString == 'touchstart' || eventTypeString == 'touchend',
        eventTypeString: eventTypeString,
        callbackfunc: callbackfunc,
        handlerFunc: touchEventHandlerFunc,
        useCapture: useCapture
      };
      JSEvents.registerOrRemoveHandler(eventHandler);
    }function _emscripten_set_touchcancel_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
      __registerTouchEventCallback(target, userData, useCapture, callbackfunc, 25, "touchcancel", targetThread);
      return 0;
    }

  function _emscripten_set_touchend_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
      __registerTouchEventCallback(target, userData, useCapture, callbackfunc, 23, "touchend", targetThread);
      return 0;
    }

  function _emscripten_set_touchmove_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
      __registerTouchEventCallback(target, userData, useCapture, callbackfunc, 24, "touchmove", targetThread);
      return 0;
    }

  function _emscripten_set_touchstart_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
      __registerTouchEventCallback(target, userData, useCapture, callbackfunc, 22, "touchstart", targetThread);
      return 0;
    }

  
  
  function __fillVisibilityChangeEventData(eventStruct, e) {
      var visibilityStates = [ "hidden", "visible", "prerender", "unloaded" ];
      var visibilityState = visibilityStates.indexOf(document.visibilityState);
  
      HEAP32[((eventStruct)>>2)]=document.hidden;
      HEAP32[(((eventStruct)+(4))>>2)]=visibilityState;
    }function __registerVisibilityChangeEventCallback(target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) {
      if (!JSEvents.visibilityChangeEvent) JSEvents.visibilityChangeEvent = _malloc( 8 );
  
      var visibilityChangeEventHandlerFunc = function(event) {
        var e = event || window.event;
  
        var visibilityChangeEvent = JSEvents.visibilityChangeEvent;
  
        __fillVisibilityChangeEventData(visibilityChangeEvent, e);
  
        if (dynCall_iiii(callbackfunc, eventTypeId, visibilityChangeEvent, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target: target,
        allowsDeferredCalls: false,
        eventTypeString: eventTypeString,
        callbackfunc: callbackfunc,
        handlerFunc: visibilityChangeEventHandlerFunc,
        useCapture: useCapture
      };
      JSEvents.registerOrRemoveHandler(eventHandler);
    }function _emscripten_set_visibilitychange_callback_on_thread(userData, useCapture, callbackfunc, targetThread) {
    if (!__specialEventTargets[1]) {
      return -4;
    }
      __registerVisibilityChangeEventCallback(__specialEventTargets[1], userData, useCapture, callbackfunc, 21, "visibilitychange", targetThread);
      return 0;
    }

  
  function __registerWheelEventCallback(target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) {
      if (!JSEvents.wheelEvent) JSEvents.wheelEvent = _malloc( 104 );
  
      // The DOM Level 3 events spec event 'wheel'
      var wheelHandlerFunc = function(event) {
        var e = event || window.event;
        var wheelEvent = JSEvents.wheelEvent;
        __fillMouseEventData(wheelEvent, e, target);
        HEAPF64[(((wheelEvent)+(72))>>3)]=e["deltaX"];
        HEAPF64[(((wheelEvent)+(80))>>3)]=e["deltaY"];
        HEAPF64[(((wheelEvent)+(88))>>3)]=e["deltaZ"];
        HEAP32[(((wheelEvent)+(96))>>2)]=e["deltaMode"];
        if (dynCall_iiii(callbackfunc, eventTypeId, wheelEvent, userData)) e.preventDefault();
      };
      // The 'mousewheel' event as implemented in Safari 6.0.5
      var mouseWheelHandlerFunc = function(event) {
        var e = event || window.event;
        __fillMouseEventData(JSEvents.wheelEvent, e, target);
        HEAPF64[(((JSEvents.wheelEvent)+(72))>>3)]=e["wheelDeltaX"] || 0;
        HEAPF64[(((JSEvents.wheelEvent)+(80))>>3)]=-(e["wheelDeltaY"] ? e["wheelDeltaY"] : e["wheelDelta"]) /* 1. Invert to unify direction with the DOM Level 3 wheel event. 2. MSIE does not provide wheelDeltaY, so wheelDelta is used as a fallback. */;
        HEAPF64[(((JSEvents.wheelEvent)+(88))>>3)]=0 /* Not available */;
        HEAP32[(((JSEvents.wheelEvent)+(96))>>2)]=0 /* DOM_DELTA_PIXEL */;
        var shouldCancel = dynCall_iiii(callbackfunc, eventTypeId, JSEvents.wheelEvent, userData);
        if (shouldCancel) {
          e.preventDefault();
        }
      };
  
      var eventHandler = {
        target: target,
        allowsDeferredCalls: true,
        eventTypeString: eventTypeString,
        callbackfunc: callbackfunc,
        handlerFunc: (eventTypeString == 'wheel') ? wheelHandlerFunc : mouseWheelHandlerFunc,
        useCapture: useCapture
      };
      JSEvents.registerOrRemoveHandler(eventHandler);
    }function _emscripten_set_wheel_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
      target = __findEventTarget(target);
      if (typeof target.onwheel !== 'undefined') {
        __registerWheelEventCallback(target, userData, useCapture, callbackfunc, 9, "wheel", targetThread);
        return 0;
      } else if (typeof target.onmousewheel !== 'undefined') {
        __registerWheelEventCallback(target, userData, useCapture, callbackfunc, 9, "mousewheel", targetThread);
        return 0;
      } else {
        return -1;
      }
    }

  function _exit(status) {
      // void _exit(int status);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/exit.html
      exit(status);
    }

  function _getenv(name) {
      // char *getenv(const char *name);
      // http://pubs.opengroup.org/onlinepubs/009695399/functions/getenv.html
      if (name === 0) return 0;
      name = UTF8ToString(name);
      if (!ENV.hasOwnProperty(name)) return 0;
  
      if (_getenv.ret) _free(_getenv.ret);
      _getenv.ret = allocateUTF8(ENV[name]);
      return _getenv.ret;
    }

  function _gethostbyname(name) {
      name = UTF8ToString(name);
  
      // generate hostent
      var ret = _malloc(20); // XXX possibly leaked, as are others here
      var nameBuf = _malloc(name.length+1);
      stringToUTF8(name, nameBuf, name.length+1);
      HEAP32[((ret)>>2)]=nameBuf;
      var aliasesBuf = _malloc(4);
      HEAP32[((aliasesBuf)>>2)]=0;
      HEAP32[(((ret)+(4))>>2)]=aliasesBuf;
      var afinet = 2;
      HEAP32[(((ret)+(8))>>2)]=afinet;
      HEAP32[(((ret)+(12))>>2)]=4;
      var addrListBuf = _malloc(12);
      HEAP32[((addrListBuf)>>2)]=addrListBuf+8;
      HEAP32[(((addrListBuf)+(4))>>2)]=0;
      HEAP32[(((addrListBuf)+(8))>>2)]=__inet_pton4_raw(DNS.lookup_name(name));
      HEAP32[(((ret)+(16))>>2)]=addrListBuf;
      return ret;
    }

  function _gettimeofday(ptr) {
      var now = Date.now();
      HEAP32[((ptr)>>2)]=(now/1000)|0; // seconds
      HEAP32[(((ptr)+(4))>>2)]=((now % 1000)*1000)|0; // microseconds
      return 0;
    }

  function _glActiveTexture(x0) { GLctx['activeTexture'](x0) }

  function _glAttachShader(program, shader) {
      GLctx.attachShader(GL.programs[program],
                              GL.shaders[shader]);
    }

  function _glBindBuffer(target, buffer) {
  
      GLctx.bindBuffer(target, GL.buffers[buffer]);
    }

  function _glBindFramebuffer(target, framebuffer) {
  
      GLctx.bindFramebuffer(target, GL.framebuffers[framebuffer]);
  
    }

  function _glBindTexture(target, texture) {
      GLctx.bindTexture(target, GL.textures[texture]);
    }

  function _glBufferData(target, size, data, usage) {
        // N.b. here first form specifies a heap subarray, second form an integer size, so the ?: code here is polymorphic. It is advised to avoid
        // randomly mixing both uses in calling code, to avoid any potential JS engine JIT issues.
        GLctx.bufferData(target, data ? HEAPU8.subarray(data, data+size) : size, usage);
    }

  function _glClear(x0) { GLctx['clear'](x0) }

  function _glCompileShader(shader) {
      GLctx.compileShader(GL.shaders[shader]);
    }

  function _glCreateProgram() {
      var id = GL.getNewId(GL.programs);
      var program = GLctx.createProgram();
      program.name = id;
      GL.programs[id] = program;
      return id;
    }

  function _glCreateShader(shaderType) {
      var id = GL.getNewId(GL.shaders);
      GL.shaders[id] = GLctx.createShader(shaderType);
      return id;
    }

  function _glDrawArrays(mode, first, count) {
  
      GLctx.drawArrays(mode, first, count);
  
    }

  function _glEnableVertexAttribArray(index) {
      GLctx.enableVertexAttribArray(index);
    }

  function _glGenBuffers(n, buffers) {
      __glGenObject(n, buffers, 'createBuffer', GL.buffers
        );
    }

  function _glGenTextures(n, textures) {
      __glGenObject(n, textures, 'createTexture', GL.textures
        );
    }

  function _glGetAttribLocation(program, name) {
      return GLctx.getAttribLocation(GL.programs[program], UTF8ToString(name));
    }

  function _glGetProgramiv(program, pname, p) {
      if (!p) {
        // GLES2 specification does not specify how to behave if p is a null pointer. Since calling this function does not make sense
        // if p == null, issue a GL error to notify user about it.
        GL.recordError(0x0501 /* GL_INVALID_VALUE */);
        return;
      }
  
      if (program >= GL.counter) {
        GL.recordError(0x0501 /* GL_INVALID_VALUE */);
        return;
      }
  
      var ptable = GL.programInfos[program];
      if (!ptable) {
        GL.recordError(0x0502 /* GL_INVALID_OPERATION */);
        return;
      }
  
      if (pname == 0x8B84) { // GL_INFO_LOG_LENGTH
        var log = GLctx.getProgramInfoLog(GL.programs[program]);
        if (log === null) log = '(unknown error)';
        HEAP32[((p)>>2)]=log.length + 1;
      } else if (pname == 0x8B87 /* GL_ACTIVE_UNIFORM_MAX_LENGTH */) {
        HEAP32[((p)>>2)]=ptable.maxUniformLength;
      } else if (pname == 0x8B8A /* GL_ACTIVE_ATTRIBUTE_MAX_LENGTH */) {
        if (ptable.maxAttributeLength == -1) {
          program = GL.programs[program];
          var numAttribs = GLctx.getProgramParameter(program, 0x8B89/*GL_ACTIVE_ATTRIBUTES*/);
          ptable.maxAttributeLength = 0; // Spec says if there are no active attribs, 0 must be returned.
          for (var i = 0; i < numAttribs; ++i) {
            var activeAttrib = GLctx.getActiveAttrib(program, i);
            ptable.maxAttributeLength = Math.max(ptable.maxAttributeLength, activeAttrib.name.length+1);
          }
        }
        HEAP32[((p)>>2)]=ptable.maxAttributeLength;
      } else if (pname == 0x8A35 /* GL_ACTIVE_UNIFORM_BLOCK_MAX_NAME_LENGTH */) {
        if (ptable.maxUniformBlockNameLength == -1) {
          program = GL.programs[program];
          var numBlocks = GLctx.getProgramParameter(program, 0x8A36/*GL_ACTIVE_UNIFORM_BLOCKS*/);
          ptable.maxUniformBlockNameLength = 0;
          for (var i = 0; i < numBlocks; ++i) {
            var activeBlockName = GLctx.getActiveUniformBlockName(program, i);
            ptable.maxUniformBlockNameLength = Math.max(ptable.maxUniformBlockNameLength, activeBlockName.length+1);
          }
        }
        HEAP32[((p)>>2)]=ptable.maxUniformBlockNameLength;
      } else {
        HEAP32[((p)>>2)]=GLctx.getProgramParameter(GL.programs[program], pname);
      }
    }

  function _glGetShaderInfoLog(shader, maxLength, length, infoLog) {
      var log = GLctx.getShaderInfoLog(GL.shaders[shader]);
      if (log === null) log = '(unknown error)';
      if (maxLength > 0 && infoLog) {
        var numBytesWrittenExclNull = stringToUTF8(log, infoLog, maxLength);
        if (length) HEAP32[((length)>>2)]=numBytesWrittenExclNull;
      } else {
        if (length) HEAP32[((length)>>2)]=0;
      }
    }

  function _glGetShaderiv(shader, pname, p) {
      if (!p) {
        // GLES2 specification does not specify how to behave if p is a null pointer. Since calling this function does not make sense
        // if p == null, issue a GL error to notify user about it.
        GL.recordError(0x0501 /* GL_INVALID_VALUE */);
        return;
      }
      if (pname == 0x8B84) { // GL_INFO_LOG_LENGTH
        var log = GLctx.getShaderInfoLog(GL.shaders[shader]);
        if (log === null) log = '(unknown error)';
        HEAP32[((p)>>2)]=log.length + 1;
      } else if (pname == 0x8B88) { // GL_SHADER_SOURCE_LENGTH
        var source = GLctx.getShaderSource(GL.shaders[shader]);
        var sourceLength = (source === null || source.length == 0) ? 0 : source.length + 1;
        HEAP32[((p)>>2)]=sourceLength;
      } else {
        HEAP32[((p)>>2)]=GLctx.getShaderParameter(GL.shaders[shader], pname);
      }
    }

  function _glGetUniformLocation(program, name) {
      name = UTF8ToString(name);
  
      var arrayIndex = 0;
      // If user passed an array accessor "[index]", parse the array index off the accessor.
      if (name[name.length - 1] == ']') {
        var leftBrace = name.lastIndexOf('[');
        arrayIndex = name[leftBrace+1] != ']' ? parseInt(name.slice(leftBrace + 1)) : 0; // "index]", parseInt will ignore the ']' at the end; but treat "foo[]" as "foo[0]"
        name = name.slice(0, leftBrace);
      }
  
      var uniformInfo = GL.programInfos[program] && GL.programInfos[program].uniforms[name]; // returns pair [ dimension_of_uniform_array, uniform_location ]
      if (uniformInfo && arrayIndex >= 0 && arrayIndex < uniformInfo[0]) { // Check if user asked for an out-of-bounds element, i.e. for 'vec4 colors[3];' user could ask for 'colors[10]' which should return -1.
        return uniformInfo[1] + arrayIndex;
      } else {
        return -1;
      }
    }

  function _glLinkProgram(program) {
      GLctx.linkProgram(GL.programs[program]);
      GL.populateUniformTable(program);
    }

  function _glShaderSource(shader, count, string, length) {
      var source = GL.getSource(shader, count, string, length);
  
  
      GLctx.shaderSource(GL.shaders[shader], source);
    }

  function _glTexImage2D(target, level, internalFormat, width, height, border, format, type, pixels) {
      GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, pixels ? emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, internalFormat) : null);
    }

  function _glTexParameteri(x0, x1, x2) { GLctx['texParameteri'](x0, x1, x2) }

  function _glTexSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixels) {
      var pixelData = null;
      if (pixels) pixelData = emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, 0);
      GLctx.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixelData);
    }

  function _glUniform1f(location, v0) {
      GLctx.uniform1f(GL.uniforms[location], v0);
    }

  function _glUniform1i(location, v0) {
      GLctx.uniform1i(GL.uniforms[location], v0);
    }

  function _glUniformMatrix2fv(location, count, transpose, value) {
  
  
      if (4*count <= GL.MINI_TEMP_BUFFER_SIZE) {
        // avoid allocation when uploading few enough uniforms
        var view = GL.miniTempBufferViews[4*count-1];
        for (var i = 0; i < 4*count; i += 4) {
          view[i] = HEAPF32[(((value)+(4*i))>>2)];
          view[i+1] = HEAPF32[(((value)+(4*i+4))>>2)];
          view[i+2] = HEAPF32[(((value)+(4*i+8))>>2)];
          view[i+3] = HEAPF32[(((value)+(4*i+12))>>2)];
        }
      } else
      {
        var view = HEAPF32.subarray((value)>>2,(value+count*16)>>2);
      }
      GLctx.uniformMatrix2fv(GL.uniforms[location], !!transpose, view);
    }

  function _glUseProgram(program) {
      GLctx.useProgram(GL.programs[program]);
    }

  function _glVertexAttribPointer(index, size, type, normalized, stride, ptr) {
      GLctx.vertexAttribPointer(index, size, type, !!normalized, stride, ptr);
    }

  function _glViewport(x0, x1, x2, x3) { GLctx['viewport'](x0, x1, x2, x3) }

  function _inet_addr(ptr) {
      var addr = __inet_pton4_raw(UTF8ToString(ptr));
      if (addr === null) {
        return -1;
      }
      return addr;
    }

   

   

  function _llvm_log10_f32(x) {
      return Math.log(x) / Math.LN10; // TODO: Math.log10, when browser support is there
    }

  function _llvm_stackrestore(p) {
      var self = _llvm_stacksave;
      var ret = self.LLVM_SAVEDSTACKS[p];
      self.LLVM_SAVEDSTACKS.splice(p, 1);
      stackRestore(ret);
    }

  function _llvm_stacksave() {
      var self = _llvm_stacksave;
      if (!self.LLVM_SAVEDSTACKS) {
        self.LLVM_SAVEDSTACKS = [];
      }
      self.LLVM_SAVEDSTACKS.push(stackSave());
      return self.LLVM_SAVEDSTACKS.length-1;
    }

  function _llvm_trap() {
      abort('trap!');
    }

  
  var ___tm_current=4306480;
  
  
  var ___tm_timezone=(stringToUTF8("GMT", 4306528, 4), 4306528);function _localtime_r(time, tmPtr) {
      _tzset();
      var date = new Date(HEAP32[((time)>>2)]*1000);
      HEAP32[((tmPtr)>>2)]=date.getSeconds();
      HEAP32[(((tmPtr)+(4))>>2)]=date.getMinutes();
      HEAP32[(((tmPtr)+(8))>>2)]=date.getHours();
      HEAP32[(((tmPtr)+(12))>>2)]=date.getDate();
      HEAP32[(((tmPtr)+(16))>>2)]=date.getMonth();
      HEAP32[(((tmPtr)+(20))>>2)]=date.getFullYear()-1900;
      HEAP32[(((tmPtr)+(24))>>2)]=date.getDay();
  
      var start = new Date(date.getFullYear(), 0, 1);
      var yday = ((date.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))|0;
      HEAP32[(((tmPtr)+(28))>>2)]=yday;
      HEAP32[(((tmPtr)+(36))>>2)]=-(date.getTimezoneOffset() * 60);
  
      // Attention: DST is in December in South, and some regions don't have DST at all.
      var summerOffset = new Date(2000, 6, 1).getTimezoneOffset();
      var winterOffset = start.getTimezoneOffset();
      var dst = (summerOffset != winterOffset && date.getTimezoneOffset() == Math.min(winterOffset, summerOffset))|0;
      HEAP32[(((tmPtr)+(32))>>2)]=dst;
  
      var zonePtr = HEAP32[(((__get_tzname())+(dst ? 4 : 0))>>2)];
      HEAP32[(((tmPtr)+(40))>>2)]=zonePtr;
  
      return tmPtr;
    }function _localtime(time) {
      return _localtime_r(time, ___tm_current);
    }

  
  function _emscripten_memcpy_big(dest, src, num) {
      HEAPU8.set(HEAPU8.subarray(src, src+num), dest);
    }
  
   

   

   


  
  function _usleep(useconds) {
      // int usleep(useconds_t useconds);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/usleep.html
      // We're single-threaded, so use a busy loop. Super-ugly.
      var msec = useconds / 1000;
      if ((ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) && self['performance'] && self['performance']['now']) {
        var start = self['performance']['now']();
        while (self['performance']['now']() - start < msec) {
          // Do nothing.
        }
      } else {
        var start = Date.now();
        while (Date.now() - start < msec) {
          // Do nothing.
        }
      }
      return 0;
    }function _nanosleep(rqtp, rmtp) {
      // int nanosleep(const struct timespec  *rqtp, struct timespec *rmtp);
      var seconds = HEAP32[((rqtp)>>2)];
      var nanoseconds = HEAP32[(((rqtp)+(4))>>2)];
      if (rmtp !== 0) {
        HEAP32[((rmtp)>>2)]=0;
        HEAP32[(((rmtp)+(4))>>2)]=0;
      }
      return _usleep((seconds * 1e6) + (nanoseconds / 1000));
    }

  function _pthread_join() {}

  function _pthread_mutexattr_destroy() {}

  function _pthread_mutexattr_init() {}

  function _pthread_mutexattr_settype() {}

   

  function _sigaction(signum, act, oldact) {
      //int sigaction(int signum, const struct sigaction *act, struct sigaction *oldact);
      err('Calling stub instead of sigaction()');
      return 0;
    }

  
  var __sigalrm_handler=0;function _signal(sig, func) {
      if (sig == 14 /*SIGALRM*/) {
        __sigalrm_handler = func;
      } else {
        err('Calling stub instead of signal()');
      }
      return 0;
    }

  function _time(ptr) {
      var ret = (Date.now()/1000)|0;
      if (ptr) {
        HEAP32[((ptr)>>2)]=ret;
      }
      return ret;
    }
FS.staticInit();;
if (ENVIRONMENT_IS_NODE) { var fs = require("fs"); var NODEJS_PATH = require("path"); NODEFS.staticInit(); };
Module["requestFullScreen"] = function Module_requestFullScreen(lockPointer, resizeCanvas, vrDevice) { err("Module.requestFullScreen is deprecated. Please call Module.requestFullscreen instead."); Module["requestFullScreen"] = Module["requestFullscreen"]; Browser.requestFullScreen(lockPointer, resizeCanvas, vrDevice) };
  Module["requestFullscreen"] = function Module_requestFullscreen(lockPointer, resizeCanvas, vrDevice) { Browser.requestFullscreen(lockPointer, resizeCanvas, vrDevice) };
  Module["requestAnimationFrame"] = function Module_requestAnimationFrame(func) { Browser.requestAnimationFrame(func) };
  Module["setCanvasSize"] = function Module_setCanvasSize(width, height, noUpdates) { Browser.setCanvasSize(width, height, noUpdates) };
  Module["pauseMainLoop"] = function Module_pauseMainLoop() { Browser.mainLoop.pause() };
  Module["resumeMainLoop"] = function Module_resumeMainLoop() { Browser.mainLoop.resume() };
  Module["getUserMedia"] = function Module_getUserMedia() { Browser.getUserMedia() }
  Module["createContext"] = function Module_createContext(canvas, useWebGL, setInModule, webGLContextAttributes) { return Browser.createContext(canvas, useWebGL, setInModule, webGLContextAttributes) };
if (ENVIRONMENT_IS_NODE) {
    _emscripten_get_now = function _emscripten_get_now_actual() {
      var t = process['hrtime']();
      return t[0] * 1e3 + t[1] / 1e6;
    };
  } else if (typeof dateNow !== 'undefined') {
    _emscripten_get_now = dateNow;
  } else if (typeof performance === 'object' && performance && typeof performance['now'] === 'function') {
    _emscripten_get_now = function() { return performance['now'](); };
  } else {
    _emscripten_get_now = Date.now;
  };
var GLctx; GL.init();
for (var i = 0; i < 32; i++) __tempFixedLengthArray.push(new Array(i));;
var ASSERTIONS = true;

// Copyright 2017 The Emscripten Authors.  All rights reserved.
// Emscripten is available under two separate licenses, the MIT license and the
// University of Illinois/NCSA Open Source License.  Both these licenses can be
// found in the LICENSE file.

/** @type {function(string, boolean=, number=)} */
function intArrayFromString(stringy, dontAddNull, length) {
  var len = length > 0 ? length : lengthBytesUTF8(stringy)+1;
  var u8array = new Array(len);
  var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
  if (dontAddNull) u8array.length = numBytesWritten;
  return u8array;
}

function intArrayToString(array) {
  var ret = [];
  for (var i = 0; i < array.length; i++) {
    var chr = array[i];
    if (chr > 0xFF) {
      if (ASSERTIONS) {
        assert(false, 'Character code ' + chr + ' (' + String.fromCharCode(chr) + ')  at offset ' + i + ' not in 0x00-0xFF.');
      }
      chr &= 0xFF;
    }
    ret.push(String.fromCharCode(chr));
  }
  return ret.join('');
}


// ASM_LIBRARY EXTERN PRIMITIVES: Int8Array,Int32Array


var debug_table_X = ["0", "asm['_GLES2_CreateRenderer']", "asm['_malloc']", "asm['_calloc']", "asm['_realloc']", "asm['_free']", "asm['_SDL_Blit_RGB888_RGB888_Scale']", "asm['_SDL_Blit_RGB888_RGB888_Blend']", "asm['_SDL_Blit_RGB888_RGB888_Blend_Scale']", "asm['_SDL_Blit_RGB888_RGB888_Modulate']", "asm['_SDL_Blit_RGB888_RGB888_Modulate_Scale']", "asm['_SDL_Blit_RGB888_RGB888_Modulate_Blend']", "asm['_SDL_Blit_RGB888_RGB888_Modulate_Blend_Scale']", "asm['_SDL_Blit_RGB888_BGR888_Scale']", "asm['_SDL_Blit_RGB888_BGR888_Blend']", "asm['_SDL_Blit_RGB888_BGR888_Blend_Scale']", "asm['_SDL_Blit_RGB888_BGR888_Modulate']", "asm['_SDL_Blit_RGB888_BGR888_Modulate_Scale']", "asm['_SDL_Blit_RGB888_BGR888_Modulate_Blend']", "asm['_SDL_Blit_RGB888_BGR888_Modulate_Blend_Scale']", "asm['_SDL_Blit_RGB888_ARGB8888_Scale']", "asm['_SDL_Blit_RGB888_ARGB8888_Blend']", "asm['_SDL_Blit_RGB888_ARGB8888_Blend_Scale']", "asm['_SDL_Blit_RGB888_ARGB8888_Modulate']", "asm['_SDL_Blit_RGB888_ARGB8888_Modulate_Scale']", "asm['_SDL_Blit_RGB888_ARGB8888_Modulate_Blend']", "asm['_SDL_Blit_RGB888_ARGB8888_Modulate_Blend_Scale']", "asm['_SDL_Blit_BGR888_RGB888_Scale']", "asm['_SDL_Blit_BGR888_RGB888_Blend']", "asm['_SDL_Blit_BGR888_RGB888_Blend_Scale']", "asm['_SDL_Blit_BGR888_RGB888_Modulate']", "asm['_SDL_Blit_BGR888_RGB888_Modulate_Scale']", "asm['_SDL_Blit_BGR888_RGB888_Modulate_Blend']", "asm['_SDL_Blit_BGR888_RGB888_Modulate_Blend_Scale']", "asm['_SDL_Blit_BGR888_BGR888_Scale']", "asm['_SDL_Blit_BGR888_BGR888_Blend']", "asm['_SDL_Blit_BGR888_BGR888_Blend_Scale']", "asm['_SDL_Blit_BGR888_BGR888_Modulate']", "asm['_SDL_Blit_BGR888_BGR888_Modulate_Scale']", "asm['_SDL_Blit_BGR888_BGR888_Modulate_Blend']", "asm['_SDL_Blit_BGR888_BGR888_Modulate_Blend_Scale']", "asm['_SDL_Blit_BGR888_ARGB8888_Scale']", "asm['_SDL_Blit_BGR888_ARGB8888_Blend']", "asm['_SDL_Blit_BGR888_ARGB8888_Blend_Scale']", "asm['_SDL_Blit_BGR888_ARGB8888_Modulate']", "asm['_SDL_Blit_BGR888_ARGB8888_Modulate_Scale']", "asm['_SDL_Blit_BGR888_ARGB8888_Modulate_Blend']", "asm['_SDL_Blit_BGR888_ARGB8888_Modulate_Blend_Scale']", "asm['_SDL_Blit_ARGB8888_RGB888_Scale']", "asm['_SDL_Blit_ARGB8888_RGB888_Blend']", "asm['_SDL_Blit_ARGB8888_RGB888_Blend_Scale']", "asm['_SDL_Blit_ARGB8888_RGB888_Modulate']", "asm['_SDL_Blit_ARGB8888_RGB888_Modulate_Scale']", "asm['_SDL_Blit_ARGB8888_RGB888_Modulate_Blend']", "asm['_SDL_Blit_ARGB8888_RGB888_Modulate_Blend_Scale']", "asm['_SDL_Blit_ARGB8888_BGR888_Scale']", "asm['_SDL_Blit_ARGB8888_BGR888_Blend']", "asm['_SDL_Blit_ARGB8888_BGR888_Blend_Scale']", "asm['_SDL_Blit_ARGB8888_BGR888_Modulate']", "asm['_SDL_Blit_ARGB8888_BGR888_Modulate_Scale']", "asm['_SDL_Blit_ARGB8888_BGR888_Modulate_Blend']", "asm['_SDL_Blit_ARGB8888_BGR888_Modulate_Blend_Scale']", "asm['_SDL_Blit_ARGB8888_ARGB8888_Scale']", "asm['_SDL_Blit_ARGB8888_ARGB8888_Blend']", "asm['_SDL_Blit_ARGB8888_ARGB8888_Blend_Scale']", "asm['_SDL_Blit_ARGB8888_ARGB8888_Modulate']", "asm['_SDL_Blit_ARGB8888_ARGB8888_Modulate_Scale']", "asm['_SDL_Blit_ARGB8888_ARGB8888_Modulate_Blend']", "asm['_SDL_Blit_ARGB8888_ARGB8888_Modulate_Blend_Scale']", "asm['_SDL_Blit_RGBA8888_RGB888_Scale']", "asm['_SDL_Blit_RGBA8888_RGB888_Blend']", "asm['_SDL_Blit_RGBA8888_RGB888_Blend_Scale']", "asm['_SDL_Blit_RGBA8888_RGB888_Modulate']", "asm['_SDL_Blit_RGBA8888_RGB888_Modulate_Scale']", "asm['_SDL_Blit_RGBA8888_RGB888_Modulate_Blend']", "asm['_SDL_Blit_RGBA8888_RGB888_Modulate_Blend_Scale']", "asm['_SDL_Blit_RGBA8888_BGR888_Scale']", "asm['_SDL_Blit_RGBA8888_BGR888_Blend']", "asm['_SDL_Blit_RGBA8888_BGR888_Blend_Scale']", "asm['_SDL_Blit_RGBA8888_BGR888_Modulate']", "asm['_SDL_Blit_RGBA8888_BGR888_Modulate_Scale']", "asm['_SDL_Blit_RGBA8888_BGR888_Modulate_Blend']", "asm['_SDL_Blit_RGBA8888_BGR888_Modulate_Blend_Scale']", "asm['_SDL_Blit_RGBA8888_ARGB8888_Scale']", "asm['_SDL_Blit_RGBA8888_ARGB8888_Blend']", "asm['_SDL_Blit_RGBA8888_ARGB8888_Blend_Scale']", "asm['_SDL_Blit_RGBA8888_ARGB8888_Modulate']", "asm['_SDL_Blit_RGBA8888_ARGB8888_Modulate_Scale']", "asm['_SDL_Blit_RGBA8888_ARGB8888_Modulate_Blend']", "asm['_SDL_Blit_RGBA8888_ARGB8888_Modulate_Blend_Scale']", "asm['_SDL_Blit_ABGR8888_RGB888_Scale']", "asm['_SDL_Blit_ABGR8888_RGB888_Blend']", "asm['_SDL_Blit_ABGR8888_RGB888_Blend_Scale']", "asm['_SDL_Blit_ABGR8888_RGB888_Modulate']", "asm['_SDL_Blit_ABGR8888_RGB888_Modulate_Scale']", "asm['_SDL_Blit_ABGR8888_RGB888_Modulate_Blend']", "asm['_SDL_Blit_ABGR8888_RGB888_Modulate_Blend_Scale']", "asm['_SDL_Blit_ABGR8888_BGR888_Scale']", "asm['_SDL_Blit_ABGR8888_BGR888_Blend']", "asm['_SDL_Blit_ABGR8888_BGR888_Blend_Scale']", "asm['_SDL_Blit_ABGR8888_BGR888_Modulate']", "asm['_SDL_Blit_ABGR8888_BGR888_Modulate_Scale']", "asm['_SDL_Blit_ABGR8888_BGR888_Modulate_Blend']", "asm['_SDL_Blit_ABGR8888_BGR888_Modulate_Blend_Scale']", "asm['_SDL_Blit_ABGR8888_ARGB8888_Scale']", "asm['_SDL_Blit_ABGR8888_ARGB8888_Blend']", "asm['_SDL_Blit_ABGR8888_ARGB8888_Blend_Scale']", "asm['_SDL_Blit_ABGR8888_ARGB8888_Modulate']", "asm['_SDL_Blit_ABGR8888_ARGB8888_Modulate_Scale']", "asm['_SDL_Blit_ABGR8888_ARGB8888_Modulate_Blend']", "asm['_SDL_Blit_ABGR8888_ARGB8888_Modulate_Blend_Scale']", "asm['_SDL_Blit_BGRA8888_RGB888_Scale']", "asm['_SDL_Blit_BGRA8888_RGB888_Blend']", "asm['_SDL_Blit_BGRA8888_RGB888_Blend_Scale']", "asm['_SDL_Blit_BGRA8888_RGB888_Modulate']", "asm['_SDL_Blit_BGRA8888_RGB888_Modulate_Scale']", "asm['_SDL_Blit_BGRA8888_RGB888_Modulate_Blend']", "asm['_SDL_Blit_BGRA8888_RGB888_Modulate_Blend_Scale']", "asm['_SDL_Blit_BGRA8888_BGR888_Scale']", "asm['_SDL_Blit_BGRA8888_BGR888_Blend']", "asm['_SDL_Blit_BGRA8888_BGR888_Blend_Scale']", "asm['_SDL_Blit_BGRA8888_BGR888_Modulate']", "asm['_SDL_Blit_BGRA8888_BGR888_Modulate_Scale']", "asm['_SDL_Blit_BGRA8888_BGR888_Modulate_Blend']", "asm['_SDL_Blit_BGRA8888_BGR888_Modulate_Blend_Scale']", "asm['_SDL_Blit_BGRA8888_ARGB8888_Scale']", "asm['_SDL_Blit_BGRA8888_ARGB8888_Blend']", "asm['_SDL_Blit_BGRA8888_ARGB8888_Blend_Scale']", "asm['_SDL_Blit_BGRA8888_ARGB8888_Modulate']", "asm['_SDL_Blit_BGRA8888_ARGB8888_Modulate_Scale']", "asm['_SDL_Blit_BGRA8888_ARGB8888_Modulate_Blend']", "asm['_SDL_Blit_BGRA8888_ARGB8888_Modulate_Blend_Scale']", "asm['_BlitNtoN']", "asm['_Blit_RGB565_ARGB8888']", "asm['_Blit_RGB565_ABGR8888']", "asm['_Blit_RGB565_RGBA8888']", "asm['_Blit_RGB565_BGRA8888']", "asm['_Blit_RGB888_RGB565']", "asm['_Blit_RGB888_RGB555']", "asm['_Blit1to1']", "asm['_Blit1to2']", "asm['_Blit1to3']", "asm['_Blit1to4']", "asm['_Blit1to1Key']", "asm['_Blit1to2Key']", "asm['_Blit1to3Key']", "asm['_Blit1to4Key']", "asm['_BlitBto1']", "asm['_BlitBto2']", "asm['_BlitBto3']", "asm['_BlitBto4']", "asm['_BlitBto1Key']", "asm['_BlitBto2Key']", "asm['_BlitBto3Key']", "asm['_BlitBto4Key']", "asm['_getpix_8']", "asm['_getpix_16']", "asm['_getpix_24']", "asm['_getpix_32']", "asm['_SW_CreateRenderer']", "asm['_Emscripten_Available']", "asm['_Emscripten_CreateDevice']", "asm['_EMSCRIPTENAUDIO_Init']", "asm['_DISKAUDIO_Init']", "asm['_DUMMYAUDIO_Init']", "asm['___stdio_close']", "asm['___stdout_write']", "asm['___stdio_seek']", "asm['___stdio_write']", "asm['_sn_write']", "asm['_sub_413F60']", "asm['_sub_4814F0']", "asm['_sub_468F80']", "asm['_sub_469920']", "asm['_sub_480EF0']", "asm['_sub_480950']", "asm['_sub_480BE0']", "asm['_sub_4805A0']", "asm['_sub_480860']", "asm['_sub_485880']", "asm['_sub_481470']", "asm['_sub_484E60']", "asm['_sub_485740']", "asm['_sub_484B70']", "asm['_sdl_get_ticks']", "asm['_sub_43DE10']", "asm['_sub_40AE90']", "asm['_sub_430140']", "asm['_sub_413900']", "asm['_sub_4138E0']", "asm['_strcasecmp']", "asm['_sub_40AEB0']", "asm['_sub_4235C0']", "asm['_sub_423780']", "asm['_sub_411C40']", "asm['_sub_411D90']", "asm['_sub_412100']", "asm['_sub_412380']", "asm['_sub_412490']", "asm['_sub_412580']", "asm['_sub_441CE0']", "asm['_sub_44B390']", "asm['_sub_44B560']", "asm['_sub_44BF60']", "asm['_sub_44C120']", "asm['_sub_44C160']", "asm['_sub_40E4F0']", "asm['_sub_40E490']", "asm['_sub_40E4B0']", "asm['_sub_40C960']", "asm['_sub_40C140']", "asm['_sub_40C1B0']", "asm['_sub_40CA60']", "asm['_sub_40C1F0']", "asm['_sub_40CD60']", "asm['_sub_40C240']", "asm['_sub_40C2E0']", "asm['_sub_40C420']", "asm['_sub_40C4E0']", "asm['_sub_40C530']", "asm['_sub_40C580']", "asm['_sub_40CDC0']", "asm['_sub_40C5C0']", "asm['_sub_40C600']", "asm['_sub_40CBA0']", "asm['_sub_40CBE0']", "asm['_sub_40C9D0']", "asm['_sub_40C650']", "asm['_sub_40C660']", "asm['_sub_40C670']", "asm['_sub_40C690']", "asm['_sub_40C710']", "asm['_sub_40C720']", "asm['_sub_40C7A0']", "asm['_sub_40C7D0']", "asm['_sub_40C830']", "asm['_sub_40C880']", "asm['_sub_40C8C0']", "asm['_sub_40C8F0']", "asm['_sub_40C4F0']", "asm['_sub_40C510']", "asm['_sub_40C500']", "asm['_sub_40C520']", "asm['_sub_40CA40']", "asm['_sub_40CD50']", "asm['_sub_40CB90']", "asm['_sub_40CA50']", "asm['_sub_40E6C0']", "asm['_sub_40E680']", "asm['_sub_40DBB0']", "asm['_sub_40DBE0']", "asm['_sub_40DC10']", "asm['_sub_40DC60']", "asm['_sub_40DC50']", "asm['_sub_40E890']", "asm['_sub_40E850']", "asm['_sub_40DD00']", "asm['_sub_40DD10']", "asm['_sub_40DD60']", "asm['_sub_40DD70']", "asm['_sub_40DE10']", "asm['_sub_40DE90']", "asm['_sub_57F634']", "asm['_sub_4E04C0']", "asm['_sub_4E04D0']", "asm['_sub_4E0550']", "asm['_sub_4E05B0']", "asm['_sub_4E05F0']", "asm['_nullsub_38']", "asm['_sub_4E0640']", "asm['_sub_4E0670']", "asm['_sub_4E06F0']", "asm['_sub_4E0740']", "asm['_sub_4E07C0']", "asm['_sub_4E0850']", "asm['_sub_4E08E0']", "asm['_nullsub_39']", "asm['_nullsub_22']", "asm['_sub_4E09B0']", "asm['_nullsub_36']", "asm['_sub_4E0370']", "asm['_sub_4E0380']", "asm['_nullsub_40']", "asm['_nullsub_41']", "asm['_nullsub_42']", "asm['_sub_4E03D0']", "asm['_sub_4E0480']", "asm['_sub_4E01D0']", "asm['_nullsub_43']", "asm['_nullsub_44']", "asm['_sub_4E02C0']", "asm['_sub_4DFB50']", "asm['_sub_4DFB80']", "asm['_sub_4DFC30']", "asm['_sub_4DFCA0']", "asm['_sub_4DFD10']", "asm['_sub_4DFD40']", "asm['_sub_4DFD80']", "asm['_sub_4DFDB0']", "asm['_sub_4DFDE0']", "asm['_sub_4DFE10']", "asm['_sub_4E0140']", "asm['_sub_4E0170']", "asm['_sub_411B90']", "asm['_sub_411E60']", "asm['_sub_411ED0']", "asm['_sub_411F20']", "asm['_sub_411F70']", "asm['_sub_411FC0']", "asm['_sub_412010']", "asm['_sub_412060']", "asm['_sub_4120B0']", "asm['_sub_4121B0']", "asm['_sub_412260']", "asm['_sub_412310']", "asm['_sub_412360']", "asm['_sub_412670']", "asm['_sub_412740']", "asm['_sub_4128A0']", "asm['_sub_4128C0']", "asm['_compatGetLocalTime']", "asm['_sub_41A590']", "asm['_sub_41AA30']", "asm['_sub_41AC30']", "asm['_sub_41B420']", "asm['_sub_41B660']", "asm['_sub_41B9C0']", "asm['_sub_41BEC0']", "asm['_sub_41C080']", "asm['_sub_41C200']", "asm['_sub_41C280']", "asm['_sub_41C3B0']", "asm['_sub_41C780']", "asm['_sub_41DB90']", "asm['_sub_41E080']", "asm['_sub_41DD40']", "asm['_sub_41DD10']", "asm['_sub_41DDB0']", "asm['_sub_41DFC0']", "asm['_sub_41E0D0']", "asm['_sub_41E170']", "asm['_sub_41E1B0']", "asm['_sub_468060']", "asm['_sub_467F30']", "asm['_sub_44AF70']", "asm['_sub_446A90']", "asm['_sub_468DC0']", "asm['_sub_4683B0']", "asm['_sub_42A6E0']", "asm['_sub_429B20']", "asm['_sub_422230']", "asm['_sub_4297C0']", "asm['_sub_429530']", "asm['_sub_506260']", "asm['_sub_5060D0']", "asm['_sub_4292C0']", "asm['_sub_505C30']", "asm['_sub_505A40']", "asm['_sub_429200']", "asm['_sub_428CD0']", "asm['_sub_505080']", "asm['_sub_504F90']", "asm['_sub_428B30']", "asm['_sub_504CF0']", "asm['_sub_43EC30']", "asm['_sub_43ECB0']", "asm['_sub_43ED00']", "asm['_sub_43EFD0']", "asm['_sub_43F010']", "asm['_sub_43F030']", "asm['_sub_43F050']", "asm['_sub_43F060']", "asm['_sub_43F0D0']", "asm['_sub_43E940']", "asm['_sub_43E9F0']", "asm['_sub_43EA20']", "asm['_sub_43EC10']", "asm['_sub_442750']", "asm['_sub_442780']", "asm['_sub_4427B0']", "asm['_sub_4427E0']", "asm['_sub_442810']", "asm['_sub_440FF0']", "asm['_sub_441030']", "asm['_sub_442450']", "asm['_sub_4424C0']", "asm['_sub_440CC0']", "asm['_sub_440CE0']", "asm['_sub_440E10']", "asm['_sub_440FD0']", "asm['_sub_441010']", "asm['_sub_4421A0']", "asm['_sub_4423D0']", "asm['_sub_442410']", "asm['_sub_442480']", "asm['_sub_4424F0']", "asm['_sub_442590']", "asm['_sub_442670']", "asm['_sub_442840']", "asm['_sub_442950']", "asm['_sub_442B00']", "asm['_sub_442C90']", "asm['_sub_442ED0']", "asm['_sub_443050']", "asm['_sub_443380']", "asm['_sub_443400']", "asm['_sub_443440']", "asm['_sub_443480']", "asm['_sub_4413C0']", "asm['_sub_441440']", "asm['_sub_441460']", "asm['_sub_441480']", "asm['_sub_4414B0']", "asm['_sub_4414D0']", "asm['_sub_4414E0']", "asm['_sub_441500']", "asm['_sub_441530']", "asm['_sub_441550']", "asm['_sub_4416B0']", "asm['_sub_4416D0']", "asm['_sub_4416F0']", "asm['_sub_443250']", "asm['_sub_443280']", "asm['_sub_441050']", "asm['_sub_441130']", "asm['_sub_441210']", "asm['_sub_4412E0']", "asm['_sub_441740']", "asm['_sub_4434B0']", "asm['_sub_4435D0']", "asm['_sub_443600']", "asm['_sub_441870']", "asm['_sub_4418D0']", "asm['_sub_4418F0']", "asm['_sub_441D30']", "asm['_sub_441D80']", "asm['_sub_441EB0']", "asm['_sub_441F00']", "asm['_sub_441F50']", "asm['_sub_441FC0']", "asm['_sub_442070']", "asm['_sub_4420F0']", "asm['_sub_440F50']", "asm['_sub_440F90']", "asm['_sub_440E60']", "asm['_sub_440EB0']", "asm['_sub_440A50']", "asm['_sub_440B00']", "asm['_sub_440B50']", "asm['_sub_440C90']", "asm['_sub_440D70']", "asm['_sub_440D80']", "asm['_sub_440DD0']", "asm['_sub_441910']", "asm['_sub_441D20']", "asm['_sub_442120']", "asm['_sub_442130']", "asm['_sub_442140']", "asm['_sub_442210']", "asm['_sub_4422D0']", "asm['_sub_442340']", "asm['_sub_4423A0']", "asm['_sub_443160']", "asm['_sub_4432B0']", "asm['_sub_4435C0']", "asm['_sub_443610']", "asm['_sub_4436E0']", "asm['_sub_4437B0']", "asm['_sub_443810']", "asm['_sub_4439B0']", "asm['_sub_446AE0']", "asm['_sub_44B700']", "asm['_sub_44BB80']", "asm['_sub_44BD60']", "asm['_sub_44BD90']", "asm['_sub_44BFD0']", "asm['_sub_44C0F0']", "asm['_sub_4AFE80']", "asm['_sub_4B5E10']", "asm['_sub_4B5F30']", "asm['_sub_4B6050']", "asm['_sub_4B6120']", "asm['_sub_4B61F0']", "asm['_sub_4B64A0']", "asm['_sub_4B6A60']", "asm['_sub_4B6A80']", "asm['_sub_4B6AA0']", "asm['_sub_4B6AC0']", "asm['_sub_4B6AE0']", "asm['_sub_4B6B00']", "asm['_sub_4B6B60']", "asm['_sub_4B6E20']", "asm['_sub_4B6E40']", "asm['_sub_4B6E60']", "asm['_sub_4B6E80']", "asm['_sub_4B6FE0']", "asm['_sub_4B7040']", "asm['_sub_4B7060']", "asm['_sub_4B7310']", "asm['_sub_4B7540']", "asm['_sub_4B7700']", "asm['_sub_4B77D0']", "asm['_sub_4B7810']", "asm['_sub_4B7920']", "asm['_sub_4B79D0']", "asm['_sub_4B7A80']", "asm['_sub_4B7C20']", "asm['_sub_4B7D00']", "asm['_sub_4B8020']", "asm['_sub_4B8270']", "asm['_sub_4B9050']", "asm['_sub_4B9500']", "asm['_sub_4B95B0']", "asm['_sub_4B9690']", "asm['_sub_4B96B0']", "asm['_sub_4B96D0']", "asm['_sub_4B9770']", "asm['_sub_4B9790']", "asm['_sub_4B98A0']", "asm['_sub_4B99F0']", "asm['_sub_4B9B40']", "asm['_sub_4B9B50']", "asm['_sub_4B9C70']", "asm['_sub_4B9D70']", "asm['_sub_4B9ED0']", "asm['_sub_4B9F50']", "asm['_sub_4BA980']", "asm['_sub_4BAC80']", "asm['_sub_4BB3F0']", "asm['_sub_4BB5D0']", "asm['_sub_4BB7B0']", "asm['_sub_4BB9D0']", "asm['_sub_4BBB30']", "asm['_sub_4BBD30']", "asm['_sub_4BBD60']", "asm['_sub_4BBF10']", "asm['_sub_4BBF90']", "asm['_sub_4BC180']", "asm['_sub_4BC700']", "asm['_sub_4BC750']", "asm['_sub_4BC930']", "asm['_sub_4BC9E0']", "asm['_sub_4BCC20']", "asm['_sub_4BCC60']", "asm['_sub_4BCC90']", "asm['_sub_44B160']", "asm['_sub_44B190']", "asm['_sub_44B1C0']", "asm['_sub_44B1F0']", "asm['_sub_44B230']", "asm['_sub_44C200']", "asm['_sub_44C2F0']", "asm['_sub_44C320']", "asm['_sub_44C370']", "asm['_sub_44C3B0']", "asm['_sub_44B250']", "asm['_sub_44B2D0']", "asm['_sub_44B330']", "asm['_sub_44C3F0']", "asm['_sub_4B5C40']", "asm['_sub_44C410']", "asm['_sub_44C440']", "asm['_sub_44C480']", "asm['_sub_44C4B0']", "asm['_sub_44C500']", "asm['_sub_44C4E0']", "asm['_sub_4815E0']", "asm['_sub_481900']", "asm['_sub_4A0A00']", "asm['_sub_4A0A30']", "asm['_sub_4A0A60']", "asm['_sub_4A0650']", "asm['_sub_4A0870']", "asm['_sub_4A0690']", "asm['_sub_4A08C0']", "asm['_sub_4A06D0']", "asm['_sub_4A0910']", "asm['_sub_4A0710']", "asm['_sub_4A09B0']", "asm['_sub_4A0750']", "asm['_sub_4A0960']", "asm['_sub_4A0830']", "asm['_sub_4A0790']", "asm['_sub_4A0A90']", "asm['_sub_4A07D0']", "asm['_sub_4A0800']", "asm['_sub_4A7A80']", "asm['_sub_4A7AC0']", "asm['_sub_4A7B00']", "asm['_sub_4A7B40']", "asm['_sub_4A7BA0']", "asm['_sub_4A7BC0']", "asm['_sub_4A7C00']", "asm['_sub_4A7C40']", "asm['_sub_4A7C60']", "asm['_sub_4A7CE0']", "asm['_sub_4A7D00']", "asm['_sub_4A7D50']", "asm['_sub_4CE390']", "asm['_sub_4CE1D0']", "asm['_sub_4CE360']", "asm['_sub_4CDF80']", "asm['_sub_4CE0A0']", "asm['_sub_4CE0C0']", "asm['_sub_4CDD80']", "asm['_sub_4CDBF0']", "asm['_sub_4CD9E0']", "asm['_sub_4CD8D0']", "asm['_sub_4CD690']", "asm['_sub_4CD450']", "asm['_sub_4CD400']", "asm['_sub_4CCE70']", "asm['_sub_4CD090']", "asm['_sub_4CD0C0']", "asm['_sub_4CD0F0']", "asm['_sub_4CD120']", "asm['_sub_4CCDB0']", "asm['_sub_4CCD00']", "asm['_sub_4CCCF0']", "asm['_sub_4CCAC0']", "asm['_sub_4CC950']", "asm['_sub_4CA650']", "asm['_sub_4BC920']", "asm['_sub_454120']", "asm['_sub_453750']", "asm['_sub_535B80']", "asm['_sub_535B00']", "asm['_sub_535B30']", "asm['_sub_535990']", "asm['_sub_535AD0']", "asm['_sub_535A60']", "asm['_sub_535C20']", "asm['_sub_535B60']", "asm['_sub_535C30']", "asm['_sub_535C80']", "asm['_sub_535A20']", "asm['_sub_535BB0']", "asm['_sub_535BE0']", "asm['_sub_535970']", "asm['_sub_536EC0']", "asm['_sub_536C60']", "asm['_sub_536CF0']", "asm['_sub_536B80']", "asm['_sub_536A20']", "asm['_sub_536930']", "asm['_sub_536830']", "asm['_sub_536710']", "asm['_sub_536620']", "asm['_sub_5363F0']", "asm['_sub_5360A0']", "asm['_sub_535CD0']", "asm['_sub_5359B0']", "asm['_sub_535A00']", "asm['_sub_546820']", "asm['_sub_546850']", "asm['_sub_544960']", "asm['_sub_532100']", "asm['_sub_544990']", "asm['_sub_546430']", "asm['_sub_546410']", "asm['_sub_546420']", "asm['_sub_546010']", "asm['_sub_5449D0']", "asm['_sub_545440']", "asm['_sub_5443F0']", "asm['_sub_5445C0']", "asm['_sub_544640']", "asm['_sub_545790']", "asm['_sub_5457E0']", "asm['_sub_5457C0']", "asm['_sub_544B90']", "asm['_nullsub_66']", "asm['_nullsub_67']", "asm['_sub_5456B0']", "asm['_sub_5456D0']", "asm['_sub_5456C0']", "asm['_sub_531E20']", "asm['_sub_531EC0']", "asm['_sub_531E90']", "asm['_sub_532130']", "asm['_sub_532440']", "asm['_sub_532540']", "asm['_sub_532610']", "asm['_sub_541360']", "asm['_sub_541560']", "asm['_sub_5415F0']", "asm['_sub_541590']", "asm['_sub_5415C0']", "asm['_sub_532070']", "asm['_sub_5320E0']", "asm['_sub_532110']", "asm['_sub_544740']", "asm['_sub_544760']", "asm['_sub_544750']", "asm['_sub_545210']", "asm['_sub_545300']", "asm['_sub_545340']", "asm['_sub_5453E0']", "asm['_sub_545020']", "asm['_sub_544C40']", "asm['_sub_544D60']", "asm['_sub_544CA0']", "asm['_sub_544D80']", "asm['_sub_544EC0']", "asm['_sub_544FF0']", "asm['_sub_5348D0']", "asm['_sub_534910']", "asm['_sub_534A90']", "asm['_sub_545140']", "asm['_sub_544920']", "asm['_sub_544950']", "asm['_sub_544930']", "asm['_sub_544940']", "asm['_sub_511EB0']", "asm['_sub_511F50']", "asm['_sub_512010']", "asm['_sub_512040']", "asm['_sub_512100']", "asm['_sub_512130']", "asm['_sub_512260']", "asm['_sub_512290']", "asm['_sub_5122F0']", "asm['_sub_512320']", "asm['_sub_512350']", "asm['_sub_512370']", "asm['_sub_512500']", "asm['_sub_512560']", "asm['_sub_512610']", "asm['_sub_512670']", "asm['_sub_512690']", "asm['_sub_5126D0']", "asm['_sub_5126F0']", "asm['_sub_512730']", "asm['_sub_512750']", "asm['_sub_512790']", "asm['_sub_5127B0']", "asm['_sub_5127F0']", "asm['_sub_512810']", "asm['_sub_512850']", "asm['_sub_512870']", "asm['_sub_5128B0']", "asm['_sub_5128D0']", "asm['_sub_512910']", "asm['_sub_512990']", "asm['_sub_5129C0']", "asm['_sub_5129E0']", "asm['_sub_512A00']", "asm['_sub_512AC0']", "asm['_sub_512B10']", "asm['_sub_512B60']", "asm['_sub_512B90']", "asm['_sub_512C10']", "asm['_sub_512C20']", "asm['_sub_512C60']", "asm['_sub_512CA0']", "asm['_sub_512CE0']", "asm['_sub_512D20']", "asm['_sub_512D70']", "asm['_sub_512DB0']", "asm['_sub_512DE0']", "asm['_sub_512E10']", "asm['_sub_512EA0']", "asm['_sub_512ED0']", "asm['_sub_512F10']", "asm['_sub_512F80']", "asm['_sub_513010']", "asm['_sub_513070']", "asm['_sub_513160']", "asm['_sub_5131C0']", "asm['_sub_513230']", "asm['_sub_5132E0']", "asm['_sub_5133B0']", "asm['_sub_513460']", "asm['_sub_513490']", "asm['_sub_513530']", "asm['_sub_513570']", "asm['_sub_5135B0']", "asm['_sub_5135F0']", "asm['_sub_513630']", "asm['_sub_513670']", "asm['_sub_5136A0']", "asm['_sub_513700']", "asm['_sub_513750']", "asm['_sub_513780']", "asm['_sub_5137D0']", "asm['_sub_513820']", "asm['_sub_5138B0']", "asm['_sub_5138E0']", "asm['_sub_513910']", "asm['_sub_513960']", "asm['_sub_5139A0']", "asm['_sub_513C10']", "asm['_sub_513C60']", "asm['_sub_513C70']", "asm['_sub_513D00']", "asm['_sub_513D70']", "asm['_sub_513DB0']", "asm['_sub_513DF0']", "asm['_sub_513E20']", "asm['_sub_513E80']", "asm['_sub_513F10']", "asm['_sub_513F20']", "asm['_sub_513F30']", "asm['_sub_513F40']", "asm['_sub_513F50']", "asm['_sub_513F60']", "asm['_sub_513F70']", "asm['_sub_513FA0']", "asm['_sub_514050']", "asm['_sub_5140B0']", "asm['_sub_514170']", "asm['_sub_5141F0']", "asm['_sub_514210']", "asm['_sub_514490']", "asm['_sub_5144C0']", "asm['_sub_514510']", "asm['_sub_514570']", "asm['_sub_5145F0']", "asm['_sub_514630']", "asm['_sub_5146B0']", "asm['_sub_514730']", "asm['_sub_5147E0']", "asm['_sub_514800']", "asm['_sub_5148A0']", "asm['_sub_514940']", "asm['_sub_5149E0']", "asm['_sub_514A80']", "asm['_sub_514B10']", "asm['_sub_514BA0']", "asm['_sub_514BB0']", "asm['_sub_514BD0']", "asm['_sub_514BE0']", "asm['_sub_514C10']", "asm['_sub_514C40']", "asm['_sub_514C60']", "asm['_sub_514C90']", "asm['_sub_514CB0']", "asm['_sub_514CF0']", "asm['_sub_514D30']", "asm['_sub_514D60']", "asm['_sub_514D90']", "asm['_sub_514DF0']", "asm['_sub_514E30']", "asm['_sub_514E90']", "asm['_sub_514ED0']", "asm['_sub_514F10']", "asm['_sub_514FC0']", "asm['_sub_515060']", "asm['_sub_515130']", "asm['_sub_515200']", "asm['_sub_515220']", "asm['_sub_515240']", "asm['_sub_5154A0']", "asm['_sub_5154E0']", "asm['_sub_515550']", "asm['_sub_5155A0']", "asm['_sub_515600']", "asm['_sub_515700']", "asm['_sub_515780']", "asm['_sub_5157D0']", "asm['_sub_515800']", "asm['_sub_515850']", "asm['_sub_515880']", "asm['_sub_515910']", "asm['_sub_515950']", "asm['_sub_5159B0']", "asm['_sub_5159E0']", "asm['_sub_515AE0']", "asm['_sub_515B30']", "asm['_sub_515BF0']", "asm['_sub_515C40']", "asm['_sub_515CB0']", "asm['_sub_515CF0']", "asm['_sub_515DB0']", "asm['_sub_515DF0']", "asm['_sub_515E50']", "asm['_sub_515E80']", "asm['_sub_515EE0']", "asm['_sub_515F10']", "asm['_sub_516000']", "asm['_sub_516060']", "asm['_sub_5160F0']", "asm['_sub_516120']", "asm['_sub_516160']", "asm['_sub_516190']", "asm['_sub_5161C0']", "asm['_sub_516210']", "asm['_sub_5162D0']", "asm['_sub_5163C0']", "asm['_sub_516400']", "asm['_sub_516430']", "asm['_sub_5164A0']", "asm['_sub_5164E0']", "asm['_sub_516520']", "asm['_sub_516600']", "asm['_sub_516680']", "asm['_sub_5166A0']", "asm['_sub_5166E0']", "asm['_sub_516720']", "asm['_sub_516760']", "asm['_sub_516790']", "asm['_sub_5167D0']", "asm['_sub_516810']", "asm['_sub_516850']", "asm['_sub_516890']", "asm['_sub_516920']", "asm['_sub_516960']", "asm['_sub_516970']", "asm['_sub_516A50']", "asm['_sub_516B40']", "asm['_sub_516BC0']", "asm['_sub_516BE0']", "asm['_sub_516C10']", "asm['_sub_516C20']", "asm['_sub_516C30']", "asm['_sub_516C70']", "asm['_sub_516CB0']", "asm['_sub_516CE0']", "asm['_sub_516D40']", "asm['_sub_516D70']", "asm['_sub_516DC0']", "asm['_sub_516E10']", "asm['_sub_516E30']", "asm['_sub_516EA0']", "asm['_sub_4F49A0']", "asm['_sub_4F4A20']", "asm['_sub_4F5F30']", "asm['_sub_4F6240']", "asm['_sub_4F6390']", "asm['_sub_4F4AB0']", "asm['_sub_4F4B90']", "asm['_sub_4F4CB0']", "asm['_sub_4F4E50']", "asm['_sub_528DB0']", "asm['_sub_4F51D0']", "asm['_sub_4F5300']", "asm['_sub_4F53D0']", "asm['_sub_4F54A0']", "asm['_sub_4F5730']", "asm['_sub_4F5890']", "asm['_sub_4F5AA0']", "asm['_sub_4F5E50']", "asm['_sub_4F64A0']", "asm['_sub_4F6860']", "asm['_sub_4F6D20']", "asm['_sub_4F6EC0']", "asm['_sub_4F6B20']", "asm['_sub_52ADE0']", "asm['_sub_4F6F60']", "asm['_sub_4F70A0']", "asm['_sub_4F7130']", "asm['_sub_4F74D0']", "asm['_sub_53EE10']", "asm['_sub_536390']", "asm['_sub_53EF00']", "asm['_sub_53F670']", "asm['_sub_53ED90']", "asm['_sub_536180']", "asm['_sub_53ED60']", "asm['_sub_536130']", "asm['_sub_53ECE0']", "asm['_sub_53F7C0']", "asm['_sub_53F830']", "asm['_sub_53F290']", "asm['_sub_536260']", "asm['_sub_53F4F0']", "asm['_sub_5361B0']", "asm['_sub_53F9E0']", "asm['_sub_53FAE0']", "asm['_sub_53F930']", "asm['_sub_53EF70']", "asm['_sub_5363C0']", "asm['_sub_4F8100']", "asm['_sub_53AC10']", "asm['_nullsub_65']", "asm['_sub_53B940']", "asm['_sub_53BB00']", "asm['_sub_53AC50']", "asm['_sub_53ADC0']", "asm['_sub_53AEC0']", "asm['_sub_53B030']", "asm['_sub_536550']", "asm['_sub_53B1B0']", "asm['_sub_5365B0']", "asm['_sub_53B060']", "asm['_sub_50A5C0']", "asm['_sub_53B300']", "asm['_sub_536580']", "asm['_sub_53B5D0']", "asm['_sub_53B380']", "asm['_sub_53B860']", "asm['_sub_53C580']", "asm['_sub_53B8F0']", "asm['_sub_536600']", "asm['_sub_53BDA0']", "asm['_sub_53CD20']", "asm['_nullsub_70']", "asm['_nullsub_69']", "asm['_sub_54F9A0']", "asm['_sub_5364E0']", "asm['_sub_53BEF0']", "asm['_sub_53C0C0']", "asm['_sub_53B320']", "asm['_sub_53C160']", "asm['_sub_54F740']", "asm['_sub_53C9A0']", "asm['_sub_53CB60']", "asm['_sub_53CB90']", "asm['_sub_53CC90']", "asm['_sub_53CCB0']", "asm['_sub_53D080']", "asm['_sub_53D220']", "asm['_sub_53D270']", "asm['_sub_510E60']", "asm['_sub_53D330']", "asm['_sub_53D400']", "asm['_sub_53D5A0']", "asm['_sub_53D6E0']", "asm['_sub_53D850']", "asm['_sub_53D960']", "asm['_sub_53DA60']", "asm['_sub_53DB00']", "asm['_sub_53DB30']", "asm['_sub_53DBB0']", "asm['_sub_53DC30']", "asm['_sub_53DCC0']", "asm['_sub_53DDF0']", "asm['_sub_53DE80']", "asm['_sub_53DF40']", "asm['_sub_53E1D0']", "asm['_sub_53E190']", "asm['_sub_54F380']", "asm['_sub_54E930']", "asm['_sub_4F31E0']", "asm['_sub_4F3350']", "asm['_sub_4F34D0']", "asm['_sub_53E7F0']", "asm['_sub_53A720']", "asm['_sub_53A9C0']", "asm['_sub_4F3580']", "asm['_sub_4F3510']", "asm['_sub_4F37D0']", "asm['_sub_4F3A60']", "asm['_sub_4F3B00']", "asm['_sub_4F3C60']", "asm['_sub_4F3CE0']", "asm['_sub_4F3400']", "asm['_sub_4F3D50']", "asm['_sub_5367B0']", "asm['_sub_4F3DD0']", "asm['_sub_54C480']", "asm['_sub_54C950']", "asm['_sub_54C710']", "asm['_nullsub_68']", "asm['_sub_54CA10']", "asm['_sub_54CA50']", "asm['_sub_54CA60']", "asm['_sub_54CA90']", "asm['_sub_54CAC0']", "asm['_sub_4F0040']", "asm['_sub_4EFE80']", "asm['_nullsub_47']", "asm['_sub_4F0390']", "asm['_sub_4F03B0']", "asm['_sub_4F0400']", "asm['_sub_4F0420']", "asm['_nullsub_45']", "asm['_nullsub_46']", "asm['_nullsub_48']", "asm['_sub_4F0450']", "asm['_sub_5368C0']", "asm['_sub_4F0490']", "asm['_sub_4F04B0']", "asm['_sub_4F0570']", "asm['_sub_536910']", "asm['_sub_4F0590']", "asm['_sub_4ED290']", "asm['_sub_53EB70']", "asm['_sub_53AB10']", "asm['_sub_4ED710']", "asm['_sub_4ED500']", "asm['_sub_4EDDE0']", "asm['_sub_4ED580']", "asm['_sub_4EDE50']", "asm['_sub_4ED5E0']", "asm['_sub_4EE2F0']", "asm['_sub_536AC0']", "asm['_sub_4EE370']", "asm['_sub_54D2B0']", "asm['_sub_54CBB0']", "asm['_sub_54CAE0']", "asm['_sub_54DF30']", "asm['_sub_54DFA0']", "asm['_sub_54E010']", "asm['_sub_536B40']", "asm['_sub_54E070']", "asm['_sub_54CB10']", "asm['_sub_54E460']", "asm['_sub_54E370']", "asm['_sub_54E170']", "asm['_sub_54E4B0']", "asm['_sub_54E620']", "asm['_sub_54E630']", "asm['_sub_4E0B30']", "asm['_sub_4E23C0']", "asm['_sub_4E17B0']", "asm['_sub_4E24B0']", "asm['_sub_4E24E0']", "asm['_sub_4E2520']", "asm['_sub_4E2560']", "asm['_sub_4E1500']", "asm['_sub_4E14B0']", "asm['_sub_4E14A0']", "asm['_sub_4E27D0']", "asm['_sub_532E20']", "asm['_sub_5328B0']", "asm['_nullsub_34']", "asm['_sub_4E83B0']", "asm['_sub_4E8460']", "asm['_sub_4E87B0']", "asm['_sub_536D80']", "asm['_sub_4E8880']", "asm['_sub_4E8AC0']", "asm['_sub_4E8DF0']", "asm['_sub_4E9090']", "asm['_sub_4E9430']", "asm['_sub_536E10']", "asm['_sub_4E9490']", "asm['_sub_536E50']", "asm['_sub_4E96F0']", "asm['_sub_4E9AC0']", "asm['_sub_536DE0']", "asm['_sub_4E9C40']", "asm['_sub_4E9D80']", "asm['_sub_4EA200']", "asm['_sub_4EA080']", "asm['_sub_4EA2C0']", "asm['_sub_4EA300']", "asm['_sub_4EAAA0']", "asm['_sub_4EAAD0']", "asm['_sub_536DA0']", "asm['_sub_54FCD0']", "asm['_sub_4EACA0']", "asm['_sub_4EAD20']", "asm['_sub_4E99B0']", "asm['_sub_4E9A00']", "asm['_sub_4E9500']", "asm['_sub_4E9770']", "asm['_sub_4EAB40']", "asm['_sub_4EAB20']", "asm['_sub_4EA380']", "asm['_sub_4E9E90']", "asm['_sub_4E9FE0']", "asm['_nullsub_62']", "asm['_sub_4EADF0']", "asm['_sub_4EAE30']", "asm['_sub_4EA400']", "asm['_sub_4EAF00']", "asm['_sub_4EB490']", "asm['_sub_4EB800']", "asm['_sub_536E80']", "asm['_sub_4EB890']", "asm['_sub_4EB910']", "asm['_sub_4EAB60']", "asm['_sub_4EBA00']", "asm['_sub_4EBB80']", "asm['_sub_4EBB50']", "asm['_sub_4EBD40']", "asm['_sub_4E9E50']", "asm['_sub_4E83D0']", "asm['_sub_4EB6A0']", "asm['_sub_4EBE10']", "asm['_sub_4EBE40']", "asm['_sub_4EBF40']", "asm['_sub_549220']", "asm['_sub_5495B0']", "asm['_sub_549700']", "asm['_sub_5497E0']", "asm['_sub_549960']", "asm['_sub_549980']", "asm['_sub_549BC0']", "asm['_sub_549CA0']", "asm['_sub_549A60']", "asm['_sub_549BB0']", "asm['_sub_549380']", "asm['_sub_549D80']", "asm['_sub_549E00']", "asm['_sub_549E70']", "asm['_sub_549E90']", "asm['_sub_549FA0']", "asm['_sub_54A150']", "asm['_sub_54A250']", "asm['_sub_54A310']", "asm['_sub_54A750']", "asm['_sub_54A270']", "asm['_sub_54A890']", "asm['_sub_54A900']", "asm['_sub_54A7D0']", "asm['_sub_54A850']", "asm['_sub_54A950']", "asm['_sub_4379F0']", "asm['_sub_447620']", "asm['_sub_44A560']", "asm['_sub_426840']", "asm['_sub_43EDE0']", "asm['_sub_43EDB0']", "asm['_sub_43E9C0']", "asm['_sub_43E9D0']", "asm['_sub_43E910']", "asm['_sub_43E8E0']", "asm['_sub_438330']", "asm['_sub_439E70']", "asm['_sub_439D00']", "asm['_sub_438370']", "asm['_sub_438C80']", "asm['_sub_41E210']", "asm['_sub_438770']", "asm['_sub_438E30']", "asm['_sub_439050']", "asm['_sub_438EF0']", "asm['_sub_449CA0']", "asm['_sub_449BE0']", "asm['_sub_449C30']", "asm['_sub_43B360']", "asm['_sub_4375F0']", "asm['_sub_44AB30']", "asm['_sub_44AA40']", "asm['_sub_44AA70']", "asm['_sub_44AAC0']", "asm['_sub_44AAD0']", "asm['_sub_43C0A0']", "asm['_sub_447CC0']", "asm['_sub_447C70']", "asm['_sub_4483A0']", "asm['_sub_447BD0']", "asm['_sub_447BF0']", "asm['_sub_448140']", "asm['_sub_448340']", "asm['_sub_448240']", "asm['_sub_4489C0']", "asm['_sub_448F00']", "asm['_sub_448F60']", "asm['_sub_448FC0']", "asm['_sub_4493D0']", "asm['_sub_4497D0']", "asm['_sub_43B490']", "asm['_sub_44B0F0']", "asm['_sub_413760']", "asm['_sub_489700']", "asm['_sub_435F80']", "asm['_sub_4A1C00']", "asm['_sub_43C020']", "asm['_sub_4AA6B0']", "asm['_sub_43E230']", "asm['_sub_43E200']", "asm['_mainloop']", "asm['_sub_43FE90']", "asm['_sub_440360']", "asm['_sub_4456E0']", "asm['_sub_445840']", "asm['_sub_445BB0']", "asm['_sub_445BC0']", "asm['_sub_445B40']", "asm['_sub_445BA0']", "asm['_sub_445B20']", "asm['_sub_445B30']", "asm['_sub_4466C0']", "asm['_sub_44CDE0']", "asm['_sub_44D020']", "asm['_sub_44DD70']", "asm['_sub_44DDC0']", "asm['_sub_44DD20']", "asm['_sub_44DE80']", "asm['_sub_44DEE0']", "asm['_sub_44DE30']", "asm['_sub_44DDF0']", "asm['_sub_44E3C0']", "asm['_sub_44E630']", "asm['_sub_44E6F0']", "asm['_sub_46B330']", "asm['_sub_44E3E0']", "asm['_sub_44E320']", "asm['_sub_44E8D0']", "asm['_sub_452770']", "asm['_sub_4526F0']", "asm['_sub_4526D0']", "asm['_sub_44E6E0']", "asm['_sub_46B370']", "asm['_sub_46B2F0']", "asm['_sub_489390']", "asm['_sub_489420']", "asm['_sub_489550']", "asm['_sub_488D00']", "asm['_sub_488710']", "asm['_sub_487D70']", "asm['_sub_488870']", "asm['_sub_488160']", "asm['_sub_450960']", "asm['_sub_450E80']", "asm['_sub_450E90']", "asm['_sub_450F40']", "asm['_sub_4533D0']", "asm['_sub_453350']", "asm['_sub_453C00']", "asm['_sub_453B80']", "asm['_sub_454BA0']", "asm['_sub_454A90']", "asm['_sub_455CD0']", "asm['_sub_4560D0']", "asm['_sub_4567C0']", "asm['_sub_456640']", "asm['_sub_4585D0']", "asm['_sub_458590']", "asm['_sub_458500']", "asm['_sub_457AA0']", "asm['_sub_457B00']", "asm['_sub_459150']", "asm['_sub_45ABC0']", "asm['_sub_45B200']", "asm['_sub_45B1F0']", "asm['_sub_45B5F0']", "asm['_sub_45BD40']", "asm['_sub_45B360']", "asm['_sub_45BD30']", "asm['_sub_45CF00']", "asm['_sub_45B210']", "asm['_sub_45B070']", "asm['_sub_45CC10']", "asm['_sub_45CB30']", "asm['_sub_45C7D0']", "asm['_sub_45D7D0']", "asm['_sub_45EF50']", "asm['_sub_45FDE0']", "asm['_sub_45FBD0']", "asm['_sub_45F8D0']", "asm['_sub_45F7A0']", "asm['_sub_460000']", "asm['_sub_45FB90']", "asm['_sub_45EF30']", "asm['_sub_45FAC0']", "asm['_sub_45F630']", "asm['_sub_45F6F0']", "asm['_sub_45F450']", "asm['_sub_45F3F0']", "asm['_sub_45EF40']", "asm['_sub_45F8F0']", "asm['_sub_45F9B0']", "asm['_sub_45F520']", "asm['_sub_45F480']", "asm['_sub_45F5D0']", "asm['_sub_465CD0']", "asm['_sub_4661C0']", "asm['_sub_464BA0']", "asm['_sub_4667E0']", "asm['_sub_466220']", "asm['_sub_464BD0']", "asm['_sub_463430']", "asm['_sub_466620']", "asm['_sub_464770']", "asm['_sub_4625D0']", "asm['_sub_4661D0']", "asm['_sub_464BB0']", "asm['_sub_466580']", "asm['_sub_470E90']", "asm['_sub_470F40']", "asm['_sub_4710B0']", "asm['_sub_466550']", "asm['_sub_466160']", "asm['_sub_466BF0']", "asm['_sub_466BA0']", "asm['_sub_466E20']", "asm['_sub_466F50']", "asm['_sub_471250']", "asm['_sub_471450']", "asm['_sub_467FC0']", "asm['_sub_467F70']", "asm['_sub_4685D0']", "asm['_sub_468480']", "asm['_sub_46A820']", "asm['_sub_46A5D0']", "asm['_sub_46A7E0']", "asm['_sub_46C920']", "asm['_sub_46CCA0']", "asm['_sub_46CC70']", "asm['_sub_46CC90']", "asm['_sub_46CBD0']", "asm['_sub_44A400']", "asm['_sub_46D950']", "asm['_sub_46F060']", "asm['_sub_46F080']", "asm['_sub_46F070']", "asm['_sub_470770']", "asm['_sub_471B90']", "asm['_sub_471A80']", "asm['_sub_472100']", "asm['_sub_471D10']", "asm['_sub_471C00']", "asm['_sub_49B420']", "asm['_sub_476E90']", "asm['_sub_48D0A0']", "asm['_sub_478480']", "asm['_sub_478650']", "asm['_sub_478970']", "asm['_sub_478E50']", "asm['_sub_479B00']", "asm['_sub_479BE0']", "asm['_sub_479CB0']", "asm['_sub_479D00']", "asm['_sub_479C40']", "asm['_sub_48C9F0']", "asm['_sub_478850']", "asm['_sub_476AE0']", "asm['_sub_476850']", "asm['_sub_476DA0']", "asm['_sub_476D70']", "asm['_sub_476160']", "asm['_sub_476240']", "asm['_sub_481770']", "asm['_nullsub_8']", "asm['_sub_479690']", "asm['_sub_479680']", "asm['_sub_479820']", "asm['_sub_479810']", "asm['_sub_4C7670']", "asm['_sub_4C7440']", "asm['_sub_42FB30']", "asm['_sub_4C5EB0']", "asm['_sub_47FCE0']", "asm['_sub_480250']", "asm['_sub_480220']", "asm['_sub_4801E0']", "asm['_sub_4801B0']", "asm['_sub_480EB0']", "asm['_memcpy']", "asm['_sub_480700']", "asm['_sub_4873C0']", "asm['_sub_489E70']", "asm['_sub_48BEB0']", "asm['_sub_4CA540']", "asm['_sub_44E020']", "asm['_sub_44E000']", "asm['_sub_49C760']", "asm['_sub_4CA720']", "asm['_sub_49CA60']", "asm['_sub_49D1E0']", "asm['_sub_49D270']", "asm['_sub_49D540']", "asm['_sub_49D370']", "asm['_sub_49D770']", "asm['_sub_49D6F0']", "asm['_sub_49D9A0']", "asm['_sub_49D8E0']", "asm['_sub_49DC70']", "asm['_sub_49DBB0']", "asm['_sub_49D680']", "asm['_sub_49D880']", "asm['_sub_49DA90']", "asm['_sub_49DB20']", "asm['_sub_49DD60']", "asm['_sub_49E380']", "asm['_sub_49E060']", "asm['_sub_49E3C0']", "asm['_sub_49E540']", "asm['_sub_49EFC0']", "asm['_sub_49ED80']", "asm['_sub_49F060']", "asm['_sub_49F0F0']", "asm['_sub_49F3A0']", "asm['_sub_49F180']", "asm['_sub_49F210']", "asm['_sub_49F420']", "asm['_sub_49E930']", "asm['_sub_49F010']", "asm['_sub_4A19D0']", "asm['_sub_4A1DC0']", "asm['_sub_4A18E0']", "asm['_sub_4A1D40']", "asm['_sub_4A1D80']", "asm['_sub_4A4DB0']", "asm['_sub_4A4840']", "asm['_sub_4A2200']", "asm['_sub_4A4A20']", "asm['_sub_4A4970']", "asm['_sub_4A49A0']", "asm['_sub_4A49D0']", "asm['_sub_4A5710']", "asm['_sub_4A50A0']", "asm['_sub_4A50D0']", "asm['_sub_4A5C70']", "asm['_sub_4A4CB0']", "asm['_sub_4A5D00']", "asm['_sub_4A7330']", "asm['_sub_4A6890']", "asm['_sub_4A6C90']", "asm['_sub_4A6D20']", "asm['_sub_4A7270']", "asm['_sub_4A6DC0']", "asm['_sub_4A2490']", "asm['_sub_4A1AA0']", "asm['_sub_4A22A0']", "asm['_sub_4A7F50']", "asm['_sub_4A81D0']", "asm['_sub_4A8380']", "asm['_sub_4A3C50']", "asm['_sub_4A3FC0']", "asm['_sub_4A2DE0']", "asm['_sub_4A28E0']", "asm['_sub_4A30D0']", "asm['_sub_4A9250']", "asm['_sub_4A92C0']", "asm['_sub_4A8C00']", "asm['_sub_4A8EA0']", "asm['_sub_4A9050']", "asm['_sub_4B5010']", "asm['_sub_4B4860']", "asm['_sub_4B51E0']", "asm['_sub_4B52C0']", "asm['_sub_4B5320']", "asm['_sub_4B4BA0']", "asm['_sub_4B5540']", "asm['_sub_4B5620']", "asm['_sub_4A93C0']", "asm['_sub_4A84E0']", "asm['_sub_4A8820']", "asm['_sub_4A8A20']", "asm['_sub_4AA4D0']", "asm['_sub_4AA450']", "asm['_sub_4AA490']", "asm['_sub_4AABE0']", "asm['_sub_4CB5D0']", "asm['_sub_4AA9C0']", "asm['_sub_4AAA10']", "asm['_sub_4AB0C0']", "asm['_sub_4CB880']", "asm['_sub_4CBE70']", "asm['_sub_4CBB70']", "asm['_sub_4CBBB0']", "asm['_sub_4CBF60']", "asm['_sub_4CC140']", "asm['_sub_4CC170']", "asm['_sub_4CC4E0']", "asm['_sub_4CC6A0']", "asm['_sub_4CC660']", "asm['_sub_4CC6F0']", "asm['_sub_4AB0F0']", "asm['_sub_4AB170']", "asm['_sub_4AB420']", "asm['_sub_4AB390']", "asm['_sub_4AB340']", "asm['_sub_4CC890']", "asm['_sub_4CC830']", "asm['_sub_4AC610']", "asm['_sub_4AD5D0']", "asm['_sub_4AD570']", "asm['_sub_4BE330']", "asm['_sub_4BE320']", "asm['_sub_4ADF30']", "asm['_sub_4ADEF0']", "asm['_sub_4AEED0']", "asm['_sub_4B0020']", "asm['_sub_4AFEB0']", "asm['_sub_4B01A0']", "asm['_sub_4B0B20']", "asm['_sub_4AF060']", "asm['_sub_4AF200']", "asm['_sub_4AF2D0']", "asm['_sub_4AF400']", "asm['_sub_4AF4C0']", "asm['_sub_4AF600']", "asm['_sub_4AF650']", "asm['_sub_4B1380']", "asm['_sub_4B2480']", "asm['_sub_4B0D30']", "asm['_sub_4B1A60']", "asm['_sub_4B5AB0']", "asm['_sub_4B81E0']", "asm['_sub_4BA8B0']", "asm['_sub_4BD8C0']", "asm['_sub_4BD940']", "asm['_sub_4BD9B0']", "asm['_sub_4BDDB0']", "asm['_sub_4BDDA0']", "asm['_sub_4CF060']", "asm['_sub_4CEED0']", "asm['_sub_4BFCD0']", "asm['_sub_4C01C0']", "asm['_sub_4BFDD0']", "asm['_sub_4C0030']", "asm['_sub_4C0C90']", "asm['_sub_4C0630']", "asm['_sub_4C0D00']", "asm['_sub_4C1120']", "asm['_sub_4C2BD0']", "asm['_sub_4C24A0']", "asm['_sub_4C2B10']", "asm['_sub_4C1FE0']", "asm['_sub_4C2C20']", "asm['_sub_4C2BE0']", "asm['_sub_4C24B0']", "asm['_sub_4C2CE0']", "asm['_sub_4C26F0']", "asm['_sub_4C2A60']", "asm['_sub_4C27F0']", "asm['_sub_4E3880']", "asm['_sub_4C3410']", "asm['_sub_4C3A90']", "asm['_sub_4C3CD0']", "asm['_sub_4C3A60']", "asm['_sub_4C3EB0']", "asm['_sub_4C69A0']", "asm['_sub_4C7110']", "asm['_sub_4C6E40']", "asm['_sub_4C6BA0']", "asm['_sub_4C7060']", "asm['_sub_4C7240']", "asm['_sub_4C6BF0']", "asm['_sub_4C6FD0']", "asm['_sub_4C6C60']", "asm['_sub_4C6DE0']", "asm['_sub_4C6B50']", "asm['_sub_4C6A00']", "asm['_sub_4C73A0']", "asm['_sub_4C80E0']", "asm['_sub_4C96A0']", "asm['_nullsub_7']", "asm['_sub_4C9970']", "asm['_sub_4C86B0']", "asm['_sub_4C91C0']", "asm['_sub_4C97F0']", "asm['_sub_4C8850']", "asm['_sub_4C8A30']", "asm['_sub_4C92F0']", "asm['_sub_4C94D0']", "asm['_sub_4C8DF0']", "asm['_sub_4C8130']", "asm['_sub_4C8410']", "asm['_sub_4C8EC0']", "asm['_sub_4C9050']", "asm['_sub_4C9B20']", "asm['_sub_4C8D60']", "asm['_sub_4C8C00']", "asm['_sub_4C82C0']", "asm['_sub_4C8570']", "asm['_sub_4C8760']", "asm['_sub_4CAF80']", "asm['_sub_4CAFF0']", "asm['_sub_4CB1A0']", "asm['_sub_4CE340']", "asm['_sub_4FAB20']", "asm['_sub_4E62F0']", "asm['_sub_4E6800']", "asm['_sub_4DEC30']", "asm['_sub_4DF630']", "asm['_sub_4E2A00']", "asm['_sub_4DF580']", "asm['_sub_40EBC0']", "asm['_sub_40ECA0']", "asm['_sub_4D2580']", "asm['_sub_4E2700']", "asm['_sub_4E6EF0']", "asm['_sub_4E8340']", "asm['_sub_4EB340']", "asm['_sub_533EB0']", "asm['_sub_539B90']", "asm['_sub_518000']", "asm['_sub_537230']", "asm['_sub_52BC90']", "asm['_sub_52BDB0']", "asm['_sub_538510']", "asm['_sub_5180B0']", "asm['_sub_5386A0']", "asm['_sub_530310']", "asm['_sub_530380']", "asm['_sub_52F460']", "asm['_sub_5011F0']", "asm['_sub_5013E0']", "asm['_sub_501690']", "asm['_sub_531310']", "asm['_sub_531410']", "asm['_sub_531420']", "asm['_sub_52E210']", "asm['_sub_52E820']", "asm['_sub_52E850']", "asm['_nullsub_29']", "asm['_sub_52ED40']", "asm['_sub_52EF30']", "asm['_sub_52EFD0']", "asm['_sub_52F1D0']", "asm['_sub_52F220']", "asm['_sub_52F2E0']", "asm['_sub_52F820']", "asm['_sub_52F8A0']", "asm['_sub_530100']", "asm['_sub_52F5A0']", "asm['_sub_52F650']", "asm['_sub_52F670']", "asm['_sub_531A00']", "asm['_sub_531AF0']", "asm['_sub_530F90']", "asm['_sub_5310C0']", "asm['_sub_531290']", "asm['_sub_531580']", "asm['_sub_531600']", "asm['_sub_5319E0']", "asm['_sub_531490']", "asm['_sub_5314F0']", "asm['_sub_531560']", "asm['_sub_500DA0']", "asm['_sub_5010D0']", "asm['_sub_5011C0']", "asm['_sub_530CA0']", "asm['_sub_530D30']", "asm['_sub_530160']", "asm['_sub_530250']", "asm['_sub_530270']", "asm['_sub_5305D0']", "asm['_sub_530650']", "asm['_sub_530820']", "asm['_sub_530880']", "asm['_sub_530A30']", "asm['_sub_530B70']", "asm['_sub_4FFA90']", "asm['_sub_500070']", "asm['_sub_500080']", "asm['_sub_52C390']", "asm['_sub_52DC80']", "asm['_sub_52C750']", "asm['_sub_52C3E0']", "asm['_sub_52BBA0']", "asm['_sub_52D5C0']", "asm['_sub_52C1E0']", "asm['_sub_52BBB0']", "asm['_sub_52CDB0']", "asm['_sub_52C920']", "asm['_sub_52D1E0']", "asm['_sub_52C8D0']", "asm['_sub_52BF00']", "asm['_sub_537E60']", "asm['_sub_52DE40']", "asm['_sub_52DF40']", "asm['_sub_52C790']", "asm['_sub_52D3C0']", "asm['_sub_52C350']", "asm['_sub_52C060']", "asm['_sub_537FA0']", "asm['_sub_52C640']", "asm['_sub_52CA30']", "asm['_sub_52BEB0']", "asm['_sub_52C980']", "asm['_sub_52C9E0']", "asm['_sub_52DD50']", "asm['_sub_52C6D0']", "asm['_sub_52CE90']", "asm['_sub_52CA80']", "asm['_sub_52CBD0']", "asm['_sub_540160']", "asm['_sub_52D9D0']", "asm['_sub_52D8A0']", "asm['_sub_52C230']", "asm['_sub_52CA70']", "asm['_sub_540440']", "asm['_sub_52C720']", "asm['_sub_52D150']", "asm['_sub_52D110']", "asm['_sub_52D190']", "asm['_sub_52D1A0']", "asm['_sub_52BFA0']", "asm['_sub_52C000']", "asm['_sub_52BF20']", "asm['_sub_52BF50']", "asm['_sub_52C680']", "asm['_sub_52C5A0']", "asm['_sub_52C190']", "asm['_sub_52C2C0']", "asm['_sub_52D330']", "asm['_sub_52DB60']", "asm['_sub_52CCD0']", "asm['_sub_52C530']", "asm['_sub_52C270']", "asm['_sub_540780']", "asm['_sub_53D510']", "asm['_sub_537F00']", "asm['_sub_52E660']", "asm['_sub_52DEC0']", "asm['_sub_52EC60']", "asm['_sub_52BE40']", "asm['_sub_530020']", "asm['_sub_52FF10']", "asm['_sub_52CF90']", "asm['_sub_52CE60']", "asm['_sub_531920']", "asm['_sub_52E0E0']", "asm['_sub_537DD0']", "asm['_sub_538280']", "asm['_sub_5286D0']", "asm['_sub_533720']", "asm['_sub_53FFB0']", "asm['_sub_50B600']", "asm['_sub_50CAC0']", "asm['_sub_50DFB0']", "asm['_sub_511020']", "asm['_sub_511F80']", "asm['_sub_512070']", "asm['_sub_512160']", "asm['_sub_5122C0']", "asm['_sub_5126C0']", "asm['_sub_512720']", "asm['_sub_512780']", "asm['_sub_5127E0']", "asm['_sub_512840']", "asm['_sub_5128A0']", "asm['_sub_512900']", "asm['_sub_512930']", "asm['_sub_512FE0']", "asm['_sub_5130E0']", "asm['_sub_513280']", "asm['_sub_513390']", "asm['_sub_515680']", "asm['_sub_5157A0']", "asm['_sub_515820']", "asm['_sub_5158C0']", "asm['_sub_515980']", "asm['_sub_515A30']", "asm['_sub_515B80']", "asm['_sub_515C80']", "asm['_sub_515D30']", "asm['_sub_515E20']", "asm['_sub_515EB0']", "asm['_sub_515F70']", "asm['_sub_516090']", "asm['_sub_516570']", "asm['_sub_516C90']", "asm['_sub_516D00']", "asm['_sub_5193B0']", "asm['_sub_51B860']", "asm['_sub_51DEA0']", "asm['_sub_532040']", "asm['_sub_532390']", "asm['_sub_533460']", "asm['_sub_53B410']", "asm['_sub_53B750']", "asm['_sub_53BD10']", "asm['_sub_53C060']", "asm['_sub_53C140']", "asm['_sub_53C240']", "asm['_sub_53CC30']", "asm['_sub_53D010']", "asm['_sub_53D170']", "asm['_sub_53D8C0']", "asm['_sub_53D9D0']", "asm['_sub_540B60']", "asm['_sub_5412A0']", "asm['_sub_50CA60']", "asm['_sub_544A40']", "asm['_sub_544B20']", "asm['_sub_54AFB0']", "asm['_sub_547120']", "asm['_sub_548220']", "asm['_sub_549270']", "asm['_sub_5494C0']", "asm['_sub_549860']", "asm['_sub_54E850']", "asm['_sub_54EF60']", "asm['_sub_54FC50']", "asm['_sub_5521A0']", "asm['_sub_553D60']", "asm['_sub_553D70']", "asm['_sub_554FF0']", "asm['_sub_578C60']", "asm['_build_server_info']", "asm['_stream_pcm_decode']", "asm['_stream_pcm_seek']", "asm['_stream_pcm_tell']", "asm['_stream_adpcm_decode']", "asm['_stream_adpcm_seek']", "asm['_stream_adpcm_tell']", "asm['_stream_mp3_decode']", "asm['_stream_mp3_seek']", "asm['_stream_mp3_tell']", "asm['_timer_callback']", "asm['_work_callback']", "asm['_sdl_present']", "asm['_sub_48C200']", "asm['_sub_48C480']", "asm['_sub_48C4D0']", "asm['_sub_48C320']", "asm['_sub_48C420']", "asm['_sub_4AD2A0']", "asm['_sub_4AD1E0']", "asm['_sub_4AD180']", "asm['_sub_435180']", "asm['_sub_435240']", "asm['_sub_434E80']", "asm['_sub_4351C0']", "asm['_sub_435280']", "asm['_sub_435200']", "asm['_sub_434EC0']", "asm['_fake_keyup']", "asm['_fake_mouseup']", "asm['_sub_42E600']", "asm['_sub_42E620']", "asm['_CONNECT_RESULT']", "asm['_CONNECT_SERVER']", "asm['_mainloop_exit_2']", "asm['_mainloop_exit_1']", "asm['_sub_43C860']", "asm['_NET_CONNECT']", "asm['_NET_CONNECT_THEN']", "asm['_NET_CONNECT_WAIT_LOOP']", "asm['_CONNECT_WAIT_LOOP']", "asm['_NET_CONNECT_WAIT_THEN']", "asm['_CONNECT_WAIT_THEN']", "asm['_CONNECT_PREPARE']", "asm['_GLES2_WindowEvent']", "asm['_GLES2_GetOutputSize']", "asm['_GLES2_SupportsBlendMode']", "asm['_GLES2_CreateTexture']", "asm['_GLES2_UpdateTexture']", "asm['_GLES2_UpdateTextureYUV']", "asm['_GLES2_LockTexture']", "asm['_GLES2_UnlockTexture']", "asm['_GLES2_SetRenderTarget']", "asm['_GLES2_UpdateViewport']", "asm['_GLES2_UpdateClipRect']", "asm['_GLES2_RenderClear']", "asm['_GLES2_RenderDrawPoints']", "asm['_GLES2_RenderDrawLines']", "asm['_GLES2_RenderFillRects']", "asm['_GLES2_RenderCopy']", "asm['_GLES2_RenderCopyEx']", "asm['_GLES2_RenderReadPixels']", "asm['_GLES2_RenderPresent']", "asm['_GLES2_DestroyTexture']", "asm['_GLES2_DestroyRenderer']", "asm['_GLES2_BindTexture']", "asm['_GLES2_UnbindTexture']", "asm['_uncopy_32']", "asm['_uncopy_opaque_16']", "asm['_uncopy_transl_16']", "asm['_SDL_SoftBlit']", "asm['_SDL_Blit_Slow']", "asm['_SDL_BlitCopy']", "asm['_SDL_RLEBlit']", "asm['_copy_transl_565']", "asm['_copy_transl_555']", "asm['_copy_opaque_16']", "asm['_copy_32']", "asm['_SDL_RLEAlphaBlit']", "asm['_BlitBtoNAlpha']", "asm['_BlitBtoNAlphaKey']", "asm['_Blit1toNAlpha']", "asm['_Blit1toNAlphaKey']", "asm['_BlitNtoNPixelAlpha']", "asm['_BlitARGBto555PixelAlpha']", "asm['_BlitARGBto565PixelAlpha']", "asm['_BlitNtoNSurfaceAlpha']", "asm['_Blit555to555SurfaceAlpha']", "asm['_Blit565to565SurfaceAlpha']", "asm['_BlitNtoNSurfaceAlphaKey']", "asm['_BlitNto1SurfaceAlphaKey']", "asm['_BlitNto1PixelAlpha']", "asm['_BlitRGBtoRGBPixelAlpha']", "asm['_BlitNto1SurfaceAlpha']", "asm['_BlitRGBtoRGBSurfaceAlpha']", "asm['_BlitNtoNCopyAlpha']", "asm['_Blit4to4CopyAlpha']", "asm['_Blit_RGB888_index8']", "asm['_Blit_RGB101010_index8']", "asm['_BlitNto1']", "asm['_Blit2101010toN']", "asm['_BlitNto2101010']", "asm['_Blit4to4MaskAlpha']", "asm['_Blit2to2Key']", "asm['_BlitNto1Key']", "asm['_BlitNtoNKeyCopyAlpha']", "asm['_BlitNtoNKey']", "asm['_SDL_LogOutput']", "asm['_RemovePendingResizedEvents']", "asm['_RemovePendingSizeChangedEvents']", "asm['_RemovePendingMoveEvents']", "asm['_RemovePendingExposedEvents']", "asm['_cmpmodes']", "asm['_SW_WindowEvent']", "asm['_SW_GetOutputSize']", "asm['_SW_CreateTexture']", "asm['_SW_SetTextureColorMod']", "asm['_SW_SetTextureAlphaMod']", "asm['_SW_SetTextureBlendMode']", "asm['_SW_UpdateTexture']", "asm['_SW_LockTexture']", "asm['_SW_UnlockTexture']", "asm['_SW_SetRenderTarget']", "asm['_SW_UpdateViewport']", "asm['_SW_UpdateClipRect']", "asm['_SW_RenderClear']", "asm['_SW_RenderDrawPoints']", "asm['_SW_RenderDrawLines']", "asm['_SW_RenderFillRects']", "asm['_SW_RenderCopy']", "asm['_SW_RenderCopyEx']", "asm['_SW_RenderReadPixels']", "asm['_SW_RenderPresent']", "asm['_SW_DestroyTexture']", "asm['_SW_DestroyRenderer']", "asm['_SDL_BlendFillRect_ARGB8888']", "asm['_SDL_BlendFillRect_RGB888']", "asm['_SDL_BlendFillRect_RGBA']", "asm['_SDL_BlendFillRect_RGB']", "asm['_SDL_BlendFillRect_RGB555']", "asm['_SDL_BlendFillRect_RGB565']", "asm['_SDL_DrawLine2']", "asm['_SDL_DrawLine1']", "asm['_SDL_DrawLine4']", "asm['_SDL_BlendLine_RGB2']", "asm['_SDL_BlendLine_RGB565']", "asm['_SDL_BlendLine_RGB555']", "asm['_SDL_BlendLine_RGB888']", "asm['_SDL_BlendLine_ARGB8888']", "asm['_SDL_BlendLine_RGB4']", "asm['_SDL_BlendLine_RGBA4']", "asm['_SDL_BlendPoint_ARGB8888']", "asm['_SDL_BlendPoint_RGB888']", "asm['_SDL_BlendPoint_RGBA']", "asm['_SDL_BlendPoint_RGB']", "asm['_SDL_BlendPoint_RGB555']", "asm['_SDL_BlendPoint_RGB565']", "asm['_Emscripten_VideoInit']", "asm['_Emscripten_VideoQuit']", "asm['_Emscripten_SetDisplayMode']", "asm['_Emscripten_PumpEvents']", "asm['_Emscripten_CreateWindow']", "asm['_Emscripten_SetWindowTitle']", "asm['_Emscripten_SetWindowSize']", "asm['_Emscripten_DestroyWindow']", "asm['_Emscripten_SetWindowFullscreen']", "asm['_Emscripten_CreateWindowFramebuffer']", "asm['_Emscripten_UpdateWindowFramebuffer']", "asm['_Emscripten_DestroyWindowFramebuffer']", "asm['_Emscripten_GLES_LoadLibrary']", "asm['_SDL_EGL_GetProcAddress']", "asm['_SDL_EGL_UnloadLibrary']", "asm['_Emscripten_GLES_CreateContext']", "asm['_Emscripten_GLES_MakeCurrent']", "asm['_SDL_EGL_SetSwapInterval']", "asm['_SDL_EGL_GetSwapInterval']", "asm['_Emscripten_GLES_SwapWindow']", "asm['_SDL_EGL_DeleteContext']", "asm['_Emscripten_GLES_GetDrawableSize']", "asm['_Emscripten_DeleteDevice']", "asm['_Emscripten_HandleCanvasResize']", "_eglGetProcAddress", "_eglGetDisplay", "_eglInitialize", "_eglTerminate", "_eglChooseConfig", "_eglGetConfigAttrib", "_eglCreateContext", "_eglDestroyContext", "_eglCreateWindowSurface", "_eglDestroySurface", "_eglMakeCurrent", "_eglSwapBuffers", "_eglSwapInterval", "_eglWaitNative", "_eglWaitGL", "_eglBindAPI", "_eglQueryString", "_eglGetError", "asm['_Emscripten_HandleMouseMove']", "asm['_Emscripten_HandleMouseButton']", "asm['_Emscripten_HandleMouseFocus']", "asm['_Emscripten_HandleWheel']", "asm['_Emscripten_HandleFocus']", "asm['_Emscripten_HandleTouch']", "asm['_Emscripten_HandlePointerLockChange']", "asm['_Emscripten_HandleKey']", "asm['_Emscripten_HandleKeyPress']", "asm['_Emscripten_HandleFullscreenChange']", "asm['_Emscripten_HandleResize']", "asm['_Emscripten_HandleVisibilityChange']", "asm['_Emscripten_CreateCursor']", "asm['_Emscripten_ShowCursor']", "asm['_Emscripten_FreeCursor']", "asm['_Emscripten_WarpMouse']", "asm['_Emscripten_CreateSystemCursor']", "asm['_Emscripten_SetRelativeMouseMode']", "asm['_EMSCRIPTENAUDIO_OpenDevice']", "asm['_EMSCRIPTENAUDIO_CloseDevice']", "asm['_HandleCaptureProcess']", "asm['_HandleAudioProcess']", "asm['_DISKAUDIO_OpenDevice']", "asm['_DISKAUDIO_WaitDevice']", "asm['_DISKAUDIO_PlayDevice']", "asm['_DISKAUDIO_GetDeviceBuf']", "asm['_DISKAUDIO_CaptureFromDevice']", "asm['_DISKAUDIO_FlushCapture']", "asm['_DISKAUDIO_CloseDevice']", "asm['_DISKAUDIO_DetectDevices']", "asm['_stdio_size']", "asm['_stdio_seek']", "asm['_stdio_read']", "asm['_stdio_write']", "asm['_stdio_close']", "asm['_DUMMYAUDIO_OpenDevice']", "asm['_DUMMYAUDIO_CaptureFromDevice']", "asm['_SDL_HandleSIG']", "asm['_SDL_CreateWindowTexture']", "asm['_SDL_UpdateWindowTexture']", "asm['_SDL_DestroyWindowTexture']", "asm['_SDL_AudioLockOrUnlockDeviceWithNoMixerLock']", "asm['_SDL_AudioDetectDevices_Default']", "asm['_SDL_AudioOpenDevice_Default']", "asm['_SDL_AudioThreadInit_Default']", "asm['_SDL_AudioThreadDeinit_Default']", "asm['_SDL_AudioWaitDevice_Default']", "asm['_SDL_AudioPlayDevice_Default']", "asm['_SDL_AudioGetPendingBytes_Default']", "asm['_SDL_AudioGetDeviceBuf_Default']", "asm['_SDL_AudioCaptureFromDevice_Default']", "asm['_SDL_AudioFlushCapture_Default']", "asm['_SDL_AudioPrepareToClose_Default']", "asm['_SDL_AudioCloseDevice_Default']", "asm['_SDL_AudioLockDevice_Default']", "asm['_SDL_AudioUnlockDevice_Default']", "asm['_SDL_AudioFreeDeviceHandle_Default']", "asm['_SDL_AudioDeinitialize_Default']", "asm['_SDL_JoystickAllowBackgroundEventsChanged']", "asm['_SDL_GameControllerEventWatcher']", "asm['_SDL_GameControllerIgnoreDevicesChanged']", "asm['_SDL_GameControllerIgnoreDevicesExceptChanged']", "asm['_Emscripten_JoyStickConnected']", "asm['_Emscripten_JoyStickDisconnected']", "asm['_SDL_MouseNormalSpeedScaleChanged']", "asm['_SDL_MouseRelativeSpeedScaleChanged']", "asm['_SDL_TouchMouseEventsChanged']", "asm['_SDL_RendererEventWatch']", "asm['_Color16DitherYV12Mod1X']", "asm['_Color16DitherYV12Mod2X']", "asm['_Color24DitherYV12Mod1X']", "asm['_Color24DitherYV12Mod2X']", "asm['_Color32DitherYV12Mod1X']", "asm['_Color32DitherYV12Mod2X']", "asm['_Color16DitherYUY2Mod1X']", "asm['_Color16DitherYUY2Mod2X']", "asm['_Color24DitherYUY2Mod1X']", "asm['_Color24DitherYUY2Mod2X']", "asm['_Color32DitherYUY2Mod1X']", "asm['_Color32DitherYUY2Mod2X']", "asm['_SDL_Emscripten_TimerHelper']", "_emscripten_glVertexAttribDivisorANGLE", "_emscripten_glActiveTexture", "_emscripten_glAttachShader", "_emscripten_glBindAttribLocation", "_emscripten_glBindBuffer", "_emscripten_glBindFramebuffer", "_emscripten_glBindRenderbuffer", "_emscripten_glBindTexture", "_emscripten_glBlendColor$legalf32", "_emscripten_glBlendEquation", "_emscripten_glBlendEquationSeparate", "_emscripten_glBlendFunc", "_emscripten_glBlendFuncSeparate", "_emscripten_glBufferData", "_emscripten_glBufferSubData", "_emscripten_glCheckFramebufferStatus", "_emscripten_glClear", "_emscripten_glClearColor$legalf32", "_emscripten_glClearDepthf$legalf32", "_emscripten_glClearStencil", "_emscripten_glColorMask", "_emscripten_glCompileShader", "_emscripten_glCompressedTexImage2D", "_emscripten_glCompressedTexSubImage2D", "_emscripten_glCopyTexImage2D", "_emscripten_glCopyTexSubImage2D", "_emscripten_glCreateProgram", "_emscripten_glCreateShader", "_emscripten_glCullFace", "_emscripten_glDeleteBuffers", "_emscripten_glDeleteFramebuffers", "_emscripten_glDeleteProgram", "_emscripten_glDeleteRenderbuffers", "_emscripten_glDeleteShader", "_emscripten_glDeleteTextures", "_emscripten_glDepthFunc", "_emscripten_glDepthMask", "_emscripten_glDepthRangef$legalf32", "_emscripten_glDetachShader", "_emscripten_glDisable", "_emscripten_glDisableVertexAttribArray", "_emscripten_glDrawArrays", "_emscripten_glDrawElements", "_emscripten_glEnable", "_emscripten_glEnableVertexAttribArray", "_emscripten_glFinish", "_emscripten_glFlush", "_emscripten_glFramebufferRenderbuffer", "_emscripten_glFramebufferTexture2D", "_emscripten_glFrontFace", "_emscripten_glGenBuffers", "_emscripten_glGenerateMipmap", "_emscripten_glGenFramebuffers", "_emscripten_glGenRenderbuffers", "_emscripten_glGenTextures", "_emscripten_glGetActiveAttrib", "_emscripten_glGetActiveUniform", "_emscripten_glGetAttachedShaders", "_emscripten_glGetAttribLocation", "_emscripten_glGetBooleanv", "_emscripten_glGetBufferParameteriv", "_emscripten_glGetError", "_emscripten_glGetFloatv", "_emscripten_glGetFramebufferAttachmentParameteriv", "_emscripten_glGetIntegerv", "_emscripten_glGetProgramiv", "_emscripten_glGetProgramInfoLog", "_emscripten_glGetRenderbufferParameteriv", "_emscripten_glGetShaderiv", "_emscripten_glGetShaderInfoLog", "_emscripten_glGetShaderPrecisionFormat", "_emscripten_glGetShaderSource", "_emscripten_glGetString", "_emscripten_glGetTexParameterfv", "_emscripten_glGetTexParameteriv", "_emscripten_glGetUniformfv", "_emscripten_glGetUniformiv", "_emscripten_glGetUniformLocation", "_emscripten_glGetVertexAttribfv", "_emscripten_glGetVertexAttribiv", "_emscripten_glGetVertexAttribPointerv", "_emscripten_glHint", "_emscripten_glIsBuffer", "_emscripten_glIsEnabled", "_emscripten_glIsFramebuffer", "_emscripten_glIsProgram", "_emscripten_glIsRenderbuffer", "_emscripten_glIsShader", "_emscripten_glIsTexture", "_emscripten_glLineWidth$legalf32", "_emscripten_glLinkProgram", "_emscripten_glPixelStorei", "_emscripten_glPolygonOffset$legalf32", "_emscripten_glReadPixels", "_emscripten_glReleaseShaderCompiler", "_emscripten_glRenderbufferStorage", "_emscripten_glSampleCoverage$legalf32", "_emscripten_glScissor", "_emscripten_glShaderBinary", "_emscripten_glShaderSource", "_emscripten_glStencilFunc", "_emscripten_glStencilFuncSeparate", "_emscripten_glStencilMask", "_emscripten_glStencilMaskSeparate", "_emscripten_glStencilOp", "_emscripten_glStencilOpSeparate", "_emscripten_glTexImage2D", "_emscripten_glTexParameterf$legalf32", "_emscripten_glTexParameterfv", "_emscripten_glTexParameteri", "_emscripten_glTexParameteriv", "_emscripten_glTexSubImage2D", "_emscripten_glUniform1f$legalf32", "_emscripten_glUniform1fv", "_emscripten_glUniform1i", "_emscripten_glUniform1iv", "_emscripten_glUniform2f$legalf32", "_emscripten_glUniform2fv", "_emscripten_glUniform2i", "_emscripten_glUniform2iv", "_emscripten_glUniform3f$legalf32", "_emscripten_glUniform3fv", "_emscripten_glUniform3i", "_emscripten_glUniform3iv", "_emscripten_glUniform4f$legalf32", "_emscripten_glUniform4fv", "_emscripten_glUniform4i", "_emscripten_glUniform4iv", "_emscripten_glUniformMatrix2fv", "_emscripten_glUniformMatrix3fv", "_emscripten_glUniformMatrix4fv", "_emscripten_glUseProgram", "_emscripten_glValidateProgram", "_emscripten_glVertexAttrib1f$legalf32", "_emscripten_glVertexAttrib1fv", "_emscripten_glVertexAttrib2f$legalf32", "_emscripten_glVertexAttrib2fv", "_emscripten_glVertexAttrib3f$legalf32", "_emscripten_glVertexAttrib3fv", "_emscripten_glVertexAttrib4f$legalf32", "_emscripten_glVertexAttrib4fv", "_emscripten_glVertexAttribPointer", "_emscripten_glViewport", "_emscripten_glGenQueriesEXT", "_emscripten_glDeleteQueriesEXT", "_emscripten_glIsQueryEXT", "_emscripten_glBeginQueryEXT", "_emscripten_glEndQueryEXT", "_emscripten_glQueryCounterEXT", "_emscripten_glGetQueryivEXT", "_emscripten_glGetQueryObjectivEXT", "_emscripten_glGetQueryObjectuivEXT", "_emscripten_glGetQueryObjecti64vEXT", "_emscripten_glGetQueryObjectui64vEXT", "_emscripten_glBindVertexArrayOES", "_emscripten_glDeleteVertexArraysOES", "_emscripten_glGenVertexArraysOES", "_emscripten_glIsVertexArrayOES", "_emscripten_glDrawBuffersWEBGL", "_emscripten_glDrawArraysInstancedANGLE", "_emscripten_glDrawElementsInstancedANGLE", "asm['___stdio_read']", "asm['_do_read']", "asm['_ignore_err']", "asm['_sort']", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
var debug_table_i = [];
var debug_table_if = [];
var debug_table_ii = [];
var debug_table_iii = [];
var debug_table_iiii = [];
var debug_table_iiiii = [];
var debug_table_iiiiidii = [];
var debug_table_iiiiif = [];
var debug_table_iiiiii = [];
var debug_table_iiiiiii = [];
var debug_table_iiiiiiii = [];
var debug_table_iiiiiiiii = [];
var debug_table_iiiiiiiiii = [];
var debug_table_j = [];
var debug_table_ji = [];
var debug_table_jiji = [];
var debug_table_v = [];
var debug_table_vf = [];
var debug_table_vff = [];
var debug_table_vffff = [];
var debug_table_vfi = [];
var debug_table_vi = [];
var debug_table_vif = [];
var debug_table_viff = [];
var debug_table_vifff = [];
var debug_table_viffff = [];
var debug_table_vii = [];
var debug_table_viif = [];
var debug_table_viii = [];
var debug_table_viiii = [];
var debug_table_viiiii = [];
var debug_table_viiiiii = [];
var debug_table_viiiiiii = [];
var debug_table_viiiiiiii = [];
var debug_table_viiiiiiiii = [];
var debug_table_viiiiiiiiii = [];
var debug_table_viiiiiiiiiii = [];
function nullFunc_X(x) { err("Invalid function pointer '" + x + "' called with signature 'X'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  err("This pointer might make sense in another type signature: i: " + debug_table_i[x] + "  j: " + debug_table_j[x] + "  v: " + debug_table_v[x] + "  if: " + debug_table_if[x] + "  ii: " + debug_table_ii[x] + "  ji: " + debug_table_ji[x] + "  vf: " + debug_table_vf[x] + "  vi: " + debug_table_vi[x] + "  iii: " + debug_table_iii[x] + "  vff: " + debug_table_vff[x] + "  vfi: " + debug_table_vfi[x] + "  vif: " + debug_table_vif[x] + "  vii: " + debug_table_vii[x] + "  iiii: " + debug_table_iiii[x] + "  jiji: " + debug_table_jiji[x] + "  viff: " + debug_table_viff[x] + "  viif: " + debug_table_viif[x] + "  viii: " + debug_table_viii[x] + "  iiiii: " + debug_table_iiiii[x] + "  vffff: " + debug_table_vffff[x] + "  vifff: " + debug_table_vifff[x] + "  viiii: " + debug_table_viiii[x] + "  iiiiif: " + debug_table_iiiiif[x] + "  iiiiii: " + debug_table_iiiiii[x] + "  viffff: " + debug_table_viffff[x] + "  viiiii: " + debug_table_viiiii[x] + "  iiiiiii: " + debug_table_iiiiiii[x] + "  viiiiii: " + debug_table_viiiiii[x] + "  iiiiidii: " + debug_table_iiiiidii[x] + "  iiiiiiii: " + debug_table_iiiiiiii[x] + "  viiiiiii: " + debug_table_viiiiiii[x] + "  iiiiiiiii: " + debug_table_iiiiiiiii[x] + "  viiiiiiii: " + debug_table_viiiiiiii[x] + "  iiiiiiiiii: " + debug_table_iiiiiiiiii[x] + "  viiiiiiiii: " + debug_table_viiiiiiiii[x] + "  viiiiiiiiii: " + debug_table_viiiiiiiiii[x] + "  viiiiiiiiiii: " + debug_table_viiiiiiiiiii[x] + "  "); abort(x) }

function nullFunc_i(x) { err("Invalid function pointer '" + x + "' called with signature 'i'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  err("This pointer might make sense in another type signature: if: " + debug_table_if[x] + "  ii: " + debug_table_ii[x] + "  iii: " + debug_table_iii[x] + "  iiii: " + debug_table_iiii[x] + "  iiiii: " + debug_table_iiiii[x] + "  iiiiif: " + debug_table_iiiiif[x] + "  iiiiii: " + debug_table_iiiiii[x] + "  iiiiiii: " + debug_table_iiiiiii[x] + "  iiiiidii: " + debug_table_iiiiidii[x] + "  iiiiiiii: " + debug_table_iiiiiiii[x] + "  iiiiiiiii: " + debug_table_iiiiiiiii[x] + "  iiiiiiiiii: " + debug_table_iiiiiiiiii[x] + "  ji: " + debug_table_ji[x] + "  vi: " + debug_table_vi[x] + "  X: " + debug_table_X[x] + "  j: " + debug_table_j[x] + "  v: " + debug_table_v[x] + "  vfi: " + debug_table_vfi[x] + "  vif: " + debug_table_vif[x] + "  vii: " + debug_table_vii[x] + "  vf: " + debug_table_vf[x] + "  jiji: " + debug_table_jiji[x] + "  viff: " + debug_table_viff[x] + "  viif: " + debug_table_viif[x] + "  viii: " + debug_table_viii[x] + "  vff: " + debug_table_vff[x] + "  vifff: " + debug_table_vifff[x] + "  viiii: " + debug_table_viiii[x] + "  viffff: " + debug_table_viffff[x] + "  viiiii: " + debug_table_viiiii[x] + "  vffff: " + debug_table_vffff[x] + "  viiiiii: " + debug_table_viiiiii[x] + "  viiiiiii: " + debug_table_viiiiiii[x] + "  viiiiiiii: " + debug_table_viiiiiiii[x] + "  viiiiiiiii: " + debug_table_viiiiiiiii[x] + "  viiiiiiiiii: " + debug_table_viiiiiiiiii[x] + "  viiiiiiiiiii: " + debug_table_viiiiiiiiiii[x] + "  "); abort(x) }

function nullFunc_if(x) { err("Invalid function pointer '" + x + "' called with signature 'if'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  err("This pointer might make sense in another type signature: i: " + debug_table_i[x] + "  vif: " + debug_table_vif[x] + "  ii: " + debug_table_ii[x] + "  vf: " + debug_table_vf[x] + "  ji: " + debug_table_ji[x] + "  vi: " + debug_table_vi[x] + "  viff: " + debug_table_viff[x] + "  viif: " + debug_table_viif[x] + "  iii: " + debug_table_iii[x] + "  vff: " + debug_table_vff[x] + "  vfi: " + debug_table_vfi[x] + "  vii: " + debug_table_vii[x] + "  X: " + debug_table_X[x] + "  j: " + debug_table_j[x] + "  v: " + debug_table_v[x] + "  vifff: " + debug_table_vifff[x] + "  iiii: " + debug_table_iiii[x] + "  jiji: " + debug_table_jiji[x] + "  viii: " + debug_table_viii[x] + "  iiiiif: " + debug_table_iiiiif[x] + "  iiiii: " + debug_table_iiiii[x] + "  vffff: " + debug_table_vffff[x] + "  viffff: " + debug_table_viffff[x] + "  viiii: " + debug_table_viiii[x] + "  iiiiii: " + debug_table_iiiiii[x] + "  viiiii: " + debug_table_viiiii[x] + "  iiiiiii: " + debug_table_iiiiiii[x] + "  viiiiii: " + debug_table_viiiiii[x] + "  iiiiidii: " + debug_table_iiiiidii[x] + "  iiiiiiii: " + debug_table_iiiiiiii[x] + "  viiiiiii: " + debug_table_viiiiiii[x] + "  iiiiiiiii: " + debug_table_iiiiiiiii[x] + "  viiiiiiii: " + debug_table_viiiiiiii[x] + "  iiiiiiiiii: " + debug_table_iiiiiiiiii[x] + "  viiiiiiiii: " + debug_table_viiiiiiiii[x] + "  viiiiiiiiii: " + debug_table_viiiiiiiiii[x] + "  viiiiiiiiiii: " + debug_table_viiiiiiiiiii[x] + "  "); abort(x) }

function nullFunc_ii(x) { err("Invalid function pointer '" + x + "' called with signature 'ii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  err("This pointer might make sense in another type signature: i: " + debug_table_i[x] + "  iii: " + debug_table_iii[x] + "  iiii: " + debug_table_iiii[x] + "  iiiii: " + debug_table_iiiii[x] + "  iiiiif: " + debug_table_iiiiif[x] + "  iiiiii: " + debug_table_iiiiii[x] + "  iiiiiii: " + debug_table_iiiiiii[x] + "  iiiiidii: " + debug_table_iiiiidii[x] + "  iiiiiiii: " + debug_table_iiiiiiii[x] + "  iiiiiiiii: " + debug_table_iiiiiiiii[x] + "  iiiiiiiiii: " + debug_table_iiiiiiiiii[x] + "  vii: " + debug_table_vii[x] + "  if: " + debug_table_if[x] + "  ji: " + debug_table_ji[x] + "  vi: " + debug_table_vi[x] + "  jiji: " + debug_table_jiji[x] + "  viif: " + debug_table_viif[x] + "  viii: " + debug_table_viii[x] + "  vif: " + debug_table_vif[x] + "  vfi: " + debug_table_vfi[x] + "  X: " + debug_table_X[x] + "  j: " + debug_table_j[x] + "  v: " + debug_table_v[x] + "  vf: " + debug_table_vf[x] + "  viiii: " + debug_table_viiii[x] + "  viff: " + debug_table_viff[x] + "  vff: " + debug_table_vff[x] + "  viiiii: " + debug_table_viiiii[x] + "  vifff: " + debug_table_vifff[x] + "  viffff: " + debug_table_viffff[x] + "  viiiiii: " + debug_table_viiiiii[x] + "  vffff: " + debug_table_vffff[x] + "  viiiiiii: " + debug_table_viiiiiii[x] + "  viiiiiiii: " + debug_table_viiiiiiii[x] + "  viiiiiiiii: " + debug_table_viiiiiiiii[x] + "  viiiiiiiiii: " + debug_table_viiiiiiiiii[x] + "  viiiiiiiiiii: " + debug_table_viiiiiiiiiii[x] + "  "); abort(x) }

function nullFunc_iii(x) { err("Invalid function pointer '" + x + "' called with signature 'iii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  err("This pointer might make sense in another type signature: ii: " + debug_table_ii[x] + "  iiii: " + debug_table_iiii[x] + "  i: " + debug_table_i[x] + "  iiiii: " + debug_table_iiiii[x] + "  iiiiif: " + debug_table_iiiiif[x] + "  iiiiii: " + debug_table_iiiiii[x] + "  iiiiiii: " + debug_table_iiiiiii[x] + "  iiiiidii: " + debug_table_iiiiidii[x] + "  iiiiiiii: " + debug_table_iiiiiiii[x] + "  iiiiiiiii: " + debug_table_iiiiiiiii[x] + "  iiiiiiiiii: " + debug_table_iiiiiiiiii[x] + "  viii: " + debug_table_viii[x] + "  vii: " + debug_table_vii[x] + "  if: " + debug_table_if[x] + "  ji: " + debug_table_ji[x] + "  vi: " + debug_table_vi[x] + "  viif: " + debug_table_viif[x] + "  viiii: " + debug_table_viiii[x] + "  jiji: " + debug_table_jiji[x] + "  vfi: " + debug_table_vfi[x] + "  vif: " + debug_table_vif[x] + "  viiiii: " + debug_table_viiiii[x] + "  viff: " + debug_table_viff[x] + "  vf: " + debug_table_vf[x] + "  X: " + debug_table_X[x] + "  j: " + debug_table_j[x] + "  v: " + debug_table_v[x] + "  vff: " + debug_table_vff[x] + "  vifff: " + debug_table_vifff[x] + "  viiiiii: " + debug_table_viiiiii[x] + "  viffff: " + debug_table_viffff[x] + "  viiiiiii: " + debug_table_viiiiiii[x] + "  vffff: " + debug_table_vffff[x] + "  viiiiiiii: " + debug_table_viiiiiiii[x] + "  viiiiiiiii: " + debug_table_viiiiiiiii[x] + "  viiiiiiiiii: " + debug_table_viiiiiiiiii[x] + "  viiiiiiiiiii: " + debug_table_viiiiiiiiiii[x] + "  "); abort(x) }

function nullFunc_iiii(x) { err("Invalid function pointer '" + x + "' called with signature 'iiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  err("This pointer might make sense in another type signature: iii: " + debug_table_iii[x] + "  ii: " + debug_table_ii[x] + "  iiiii: " + debug_table_iiiii[x] + "  i: " + debug_table_i[x] + "  iiiiif: " + debug_table_iiiiif[x] + "  iiiiii: " + debug_table_iiiiii[x] + "  iiiiiii: " + debug_table_iiiiiii[x] + "  iiiiidii: " + debug_table_iiiiidii[x] + "  iiiiiiii: " + debug_table_iiiiiiii[x] + "  iiiiiiiii: " + debug_table_iiiiiiiii[x] + "  iiiiiiiiii: " + debug_table_iiiiiiiiii[x] + "  viii: " + debug_table_viii[x] + "  viiii: " + debug_table_viiii[x] + "  vii: " + debug_table_vii[x] + "  if: " + debug_table_if[x] + "  ji: " + debug_table_ji[x] + "  vi: " + debug_table_vi[x] + "  jiji: " + debug_table_jiji[x] + "  viif: " + debug_table_viif[x] + "  viiiii: " + debug_table_viiiii[x] + "  vfi: " + debug_table_vfi[x] + "  vif: " + debug_table_vif[x] + "  viff: " + debug_table_viff[x] + "  viiiiii: " + debug_table_viiiiii[x] + "  vf: " + debug_table_vf[x] + "  X: " + debug_table_X[x] + "  j: " + debug_table_j[x] + "  v: " + debug_table_v[x] + "  vff: " + debug_table_vff[x] + "  vifff: " + debug_table_vifff[x] + "  viiiiiii: " + debug_table_viiiiiii[x] + "  viffff: " + debug_table_viffff[x] + "  vffff: " + debug_table_vffff[x] + "  viiiiiiii: " + debug_table_viiiiiiii[x] + "  viiiiiiiii: " + debug_table_viiiiiiiii[x] + "  viiiiiiiiii: " + debug_table_viiiiiiiiii[x] + "  viiiiiiiiiii: " + debug_table_viiiiiiiiiii[x] + "  "); abort(x) }

function nullFunc_iiiii(x) { err("Invalid function pointer '" + x + "' called with signature 'iiiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  err("This pointer might make sense in another type signature: iiii: " + debug_table_iiii[x] + "  iii: " + debug_table_iii[x] + "  ii: " + debug_table_ii[x] + "  iiiiif: " + debug_table_iiiiif[x] + "  iiiiii: " + debug_table_iiiiii[x] + "  iiiiiii: " + debug_table_iiiiiii[x] + "  i: " + debug_table_i[x] + "  iiiiidii: " + debug_table_iiiiidii[x] + "  iiiiiiii: " + debug_table_iiiiiiii[x] + "  iiiiiiiii: " + debug_table_iiiiiiiii[x] + "  iiiiiiiiii: " + debug_table_iiiiiiiiii[x] + "  viiii: " + debug_table_viiii[x] + "  viii: " + debug_table_viii[x] + "  viiiii: " + debug_table_viiiii[x] + "  vii: " + debug_table_vii[x] + "  if: " + debug_table_if[x] + "  ji: " + debug_table_ji[x] + "  vi: " + debug_table_vi[x] + "  jiji: " + debug_table_jiji[x] + "  viif: " + debug_table_viif[x] + "  viiiiii: " + debug_table_viiiiii[x] + "  vfi: " + debug_table_vfi[x] + "  vif: " + debug_table_vif[x] + "  viff: " + debug_table_viff[x] + "  vf: " + debug_table_vf[x] + "  viiiiiii: " + debug_table_viiiiiii[x] + "  vff: " + debug_table_vff[x] + "  vifff: " + debug_table_vifff[x] + "  X: " + debug_table_X[x] + "  j: " + debug_table_j[x] + "  v: " + debug_table_v[x] + "  viiiiiiii: " + debug_table_viiiiiiii[x] + "  viffff: " + debug_table_viffff[x] + "  vffff: " + debug_table_vffff[x] + "  viiiiiiiii: " + debug_table_viiiiiiiii[x] + "  viiiiiiiiii: " + debug_table_viiiiiiiiii[x] + "  viiiiiiiiiii: " + debug_table_viiiiiiiiiii[x] + "  "); abort(x) }

function nullFunc_iiiiidii(x) { err("Invalid function pointer '" + x + "' called with signature 'iiiiidii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  err("This pointer might make sense in another type signature: iiii: " + debug_table_iiii[x] + "  iiiii: " + debug_table_iiiii[x] + "  iii: " + debug_table_iii[x] + "  ii: " + debug_table_ii[x] + "  i: " + debug_table_i[x] + "  iiiiii: " + debug_table_iiiiii[x] + "  iiiiiii: " + debug_table_iiiiiii[x] + "  viiii: " + debug_table_viiii[x] + "  viii: " + debug_table_viii[x] + "  iiiiif: " + debug_table_iiiiif[x] + "  viiiii: " + debug_table_viiiii[x] + "  viiiiii: " + debug_table_viiiiii[x] + "  vii: " + debug_table_vii[x] + "  iiiiiiii: " + debug_table_iiiiiiii[x] + "  viiiiiii: " + debug_table_viiiiiii[x] + "  jiji: " + debug_table_jiji[x] + "  viif: " + debug_table_viif[x] + "  if: " + debug_table_if[x] + "  ji: " + debug_table_ji[x] + "  vi: " + debug_table_vi[x] + "  vfi: " + debug_table_vfi[x] + "  vif: " + debug_table_vif[x] + "  iiiiiiiii: " + debug_table_iiiiiiiii[x] + "  viiiiiiii: " + debug_table_viiiiiiii[x] + "  viff: " + debug_table_viff[x] + "  vf: " + debug_table_vf[x] + "  vff: " + debug_table_vff[x] + "  vifff: " + debug_table_vifff[x] + "  iiiiiiiiii: " + debug_table_iiiiiiiiii[x] + "  viiiiiiiii: " + debug_table_viiiiiiiii[x] + "  viffff: " + debug_table_viffff[x] + "  vffff: " + debug_table_vffff[x] + "  viiiiiiiiii: " + debug_table_viiiiiiiiii[x] + "  X: " + debug_table_X[x] + "  j: " + debug_table_j[x] + "  v: " + debug_table_v[x] + "  viiiiiiiiiii: " + debug_table_viiiiiiiiiii[x] + "  "); abort(x) }

function nullFunc_iiiiif(x) { err("Invalid function pointer '" + x + "' called with signature 'iiiiif'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  err("This pointer might make sense in another type signature: iiii: " + debug_table_iiii[x] + "  iiiii: " + debug_table_iiiii[x] + "  iii: " + debug_table_iii[x] + "  ii: " + debug_table_ii[x] + "  i: " + debug_table_i[x] + "  if: " + debug_table_if[x] + "  viiii: " + debug_table_viiii[x] + "  viii: " + debug_table_viii[x] + "  iiiiii: " + debug_table_iiiiii[x] + "  viif: " + debug_table_viif[x] + "  viiiii: " + debug_table_viiiii[x] + "  vii: " + debug_table_vii[x] + "  vif: " + debug_table_vif[x] + "  jiji: " + debug_table_jiji[x] + "  viff: " + debug_table_viff[x] + "  ji: " + debug_table_ji[x] + "  vi: " + debug_table_vi[x] + "  iiiiiii: " + debug_table_iiiiiii[x] + "  vf: " + debug_table_vf[x] + "  viiiiii: " + debug_table_viiiiii[x] + "  vfi: " + debug_table_vfi[x] + "  vff: " + debug_table_vff[x] + "  vifff: " + debug_table_vifff[x] + "  iiiiidii: " + debug_table_iiiiidii[x] + "  iiiiiiii: " + debug_table_iiiiiiii[x] + "  viiiiiii: " + debug_table_viiiiiii[x] + "  viffff: " + debug_table_viffff[x] + "  vffff: " + debug_table_vffff[x] + "  iiiiiiiii: " + debug_table_iiiiiiiii[x] + "  X: " + debug_table_X[x] + "  j: " + debug_table_j[x] + "  v: " + debug_table_v[x] + "  viiiiiiii: " + debug_table_viiiiiiii[x] + "  iiiiiiiiii: " + debug_table_iiiiiiiiii[x] + "  viiiiiiiii: " + debug_table_viiiiiiiii[x] + "  viiiiiiiiii: " + debug_table_viiiiiiiiii[x] + "  viiiiiiiiiii: " + debug_table_viiiiiiiiiii[x] + "  "); abort(x) }

function nullFunc_iiiiii(x) { err("Invalid function pointer '" + x + "' called with signature 'iiiiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  err("This pointer might make sense in another type signature: iiii: " + debug_table_iiii[x] + "  iiiii: " + debug_table_iiiii[x] + "  iii: " + debug_table_iii[x] + "  ii: " + debug_table_ii[x] + "  iiiiiii: " + debug_table_iiiiiii[x] + "  iiiiiiii: " + debug_table_iiiiiiii[x] + "  i: " + debug_table_i[x] + "  iiiiiiiii: " + debug_table_iiiiiiiii[x] + "  iiiiiiiiii: " + debug_table_iiiiiiiiii[x] + "  viiii: " + debug_table_viiii[x] + "  viii: " + debug_table_viii[x] + "  iiiiif: " + debug_table_iiiiif[x] + "  viiiii: " + debug_table_viiiii[x] + "  vii: " + debug_table_vii[x] + "  viiiiii: " + debug_table_viiiiii[x] + "  jiji: " + debug_table_jiji[x] + "  viif: " + debug_table_viif[x] + "  if: " + debug_table_if[x] + "  ji: " + debug_table_ji[x] + "  vi: " + debug_table_vi[x] + "  vfi: " + debug_table_vfi[x] + "  vif: " + debug_table_vif[x] + "  iiiiidii: " + debug_table_iiiiidii[x] + "  viiiiiii: " + debug_table_viiiiiii[x] + "  viff: " + debug_table_viff[x] + "  vf: " + debug_table_vf[x] + "  vff: " + debug_table_vff[x] + "  viiiiiiii: " + debug_table_viiiiiiii[x] + "  vifff: " + debug_table_vifff[x] + "  X: " + debug_table_X[x] + "  j: " + debug_table_j[x] + "  v: " + debug_table_v[x] + "  viffff: " + debug_table_viffff[x] + "  vffff: " + debug_table_vffff[x] + "  viiiiiiiii: " + debug_table_viiiiiiiii[x] + "  viiiiiiiiii: " + debug_table_viiiiiiiiii[x] + "  viiiiiiiiiii: " + debug_table_viiiiiiiiiii[x] + "  "); abort(x) }

function nullFunc_iiiiiii(x) { err("Invalid function pointer '" + x + "' called with signature 'iiiiiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  err("This pointer might make sense in another type signature: iiii: " + debug_table_iiii[x] + "  iiiii: " + debug_table_iiiii[x] + "  iiiiii: " + debug_table_iiiiii[x] + "  iii: " + debug_table_iii[x] + "  ii: " + debug_table_ii[x] + "  iiiiiiii: " + debug_table_iiiiiiii[x] + "  iiiiiiiii: " + debug_table_iiiiiiiii[x] + "  i: " + debug_table_i[x] + "  iiiiiiiiii: " + debug_table_iiiiiiiiii[x] + "  viiii: " + debug_table_viiii[x] + "  viii: " + debug_table_viii[x] + "  iiiiif: " + debug_table_iiiiif[x] + "  viiiii: " + debug_table_viiiii[x] + "  viiiiii: " + debug_table_viiiiii[x] + "  vii: " + debug_table_vii[x] + "  iiiiidii: " + debug_table_iiiiidii[x] + "  viiiiiii: " + debug_table_viiiiiii[x] + "  jiji: " + debug_table_jiji[x] + "  viif: " + debug_table_viif[x] + "  if: " + debug_table_if[x] + "  ji: " + debug_table_ji[x] + "  vi: " + debug_table_vi[x] + "  vfi: " + debug_table_vfi[x] + "  vif: " + debug_table_vif[x] + "  viiiiiiii: " + debug_table_viiiiiiii[x] + "  viff: " + debug_table_viff[x] + "  vf: " + debug_table_vf[x] + "  vff: " + debug_table_vff[x] + "  vifff: " + debug_table_vifff[x] + "  viiiiiiiii: " + debug_table_viiiiiiiii[x] + "  viffff: " + debug_table_viffff[x] + "  vffff: " + debug_table_vffff[x] + "  X: " + debug_table_X[x] + "  j: " + debug_table_j[x] + "  v: " + debug_table_v[x] + "  viiiiiiiiii: " + debug_table_viiiiiiiiii[x] + "  viiiiiiiiiii: " + debug_table_viiiiiiiiiii[x] + "  "); abort(x) }

function nullFunc_iiiiiiii(x) { err("Invalid function pointer '" + x + "' called with signature 'iiiiiiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  err("This pointer might make sense in another type signature: iiii: " + debug_table_iiii[x] + "  iiiii: " + debug_table_iiiii[x] + "  iiiiii: " + debug_table_iiiiii[x] + "  iii: " + debug_table_iii[x] + "  iiiiiii: " + debug_table_iiiiiii[x] + "  ii: " + debug_table_ii[x] + "  iiiiiiiii: " + debug_table_iiiiiiiii[x] + "  iiiiiiiiii: " + debug_table_iiiiiiiiii[x] + "  i: " + debug_table_i[x] + "  viiii: " + debug_table_viiii[x] + "  viii: " + debug_table_viii[x] + "  iiiiif: " + debug_table_iiiiif[x] + "  viiiii: " + debug_table_viiiii[x] + "  viiiiii: " + debug_table_viiiiii[x] + "  vii: " + debug_table_vii[x] + "  iiiiidii: " + debug_table_iiiiidii[x] + "  viiiiiii: " + debug_table_viiiiiii[x] + "  jiji: " + debug_table_jiji[x] + "  viif: " + debug_table_viif[x] + "  viiiiiiii: " + debug_table_viiiiiiii[x] + "  if: " + debug_table_if[x] + "  ji: " + debug_table_ji[x] + "  vi: " + debug_table_vi[x] + "  vfi: " + debug_table_vfi[x] + "  vif: " + debug_table_vif[x] + "  viff: " + debug_table_viff[x] + "  viiiiiiiii: " + debug_table_viiiiiiiii[x] + "  vf: " + debug_table_vf[x] + "  vff: " + debug_table_vff[x] + "  vifff: " + debug_table_vifff[x] + "  viffff: " + debug_table_viffff[x] + "  vffff: " + debug_table_vffff[x] + "  viiiiiiiiii: " + debug_table_viiiiiiiiii[x] + "  X: " + debug_table_X[x] + "  j: " + debug_table_j[x] + "  v: " + debug_table_v[x] + "  viiiiiiiiiii: " + debug_table_viiiiiiiiiii[x] + "  "); abort(x) }

function nullFunc_iiiiiiiii(x) { err("Invalid function pointer '" + x + "' called with signature 'iiiiiiiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  err("This pointer might make sense in another type signature: iiii: " + debug_table_iiii[x] + "  iiiii: " + debug_table_iiiii[x] + "  iiiiii: " + debug_table_iiiiii[x] + "  iii: " + debug_table_iii[x] + "  iiiiiii: " + debug_table_iiiiiii[x] + "  iiiiiiii: " + debug_table_iiiiiiii[x] + "  ii: " + debug_table_ii[x] + "  iiiiiiiiii: " + debug_table_iiiiiiiiii[x] + "  i: " + debug_table_i[x] + "  viiii: " + debug_table_viiii[x] + "  viii: " + debug_table_viii[x] + "  iiiiif: " + debug_table_iiiiif[x] + "  viiiii: " + debug_table_viiiii[x] + "  viiiiii: " + debug_table_viiiiii[x] + "  vii: " + debug_table_vii[x] + "  iiiiidii: " + debug_table_iiiiidii[x] + "  viiiiiii: " + debug_table_viiiiiii[x] + "  jiji: " + debug_table_jiji[x] + "  viif: " + debug_table_viif[x] + "  viiiiiiii: " + debug_table_viiiiiiii[x] + "  if: " + debug_table_if[x] + "  ji: " + debug_table_ji[x] + "  vi: " + debug_table_vi[x] + "  vfi: " + debug_table_vfi[x] + "  vif: " + debug_table_vif[x] + "  viiiiiiiii: " + debug_table_viiiiiiiii[x] + "  viff: " + debug_table_viff[x] + "  vff: " + debug_table_vff[x] + "  vifff: " + debug_table_vifff[x] + "  vf: " + debug_table_vf[x] + "  viiiiiiiiii: " + debug_table_viiiiiiiiii[x] + "  viffff: " + debug_table_viffff[x] + "  vffff: " + debug_table_vffff[x] + "  viiiiiiiiiii: " + debug_table_viiiiiiiiiii[x] + "  X: " + debug_table_X[x] + "  j: " + debug_table_j[x] + "  v: " + debug_table_v[x] + "  "); abort(x) }

function nullFunc_iiiiiiiiii(x) { err("Invalid function pointer '" + x + "' called with signature 'iiiiiiiiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  err("This pointer might make sense in another type signature: iiiii: " + debug_table_iiiii[x] + "  iiii: " + debug_table_iiii[x] + "  iiiiii: " + debug_table_iiiiii[x] + "  iii: " + debug_table_iii[x] + "  iiiiiii: " + debug_table_iiiiiii[x] + "  iiiiiiii: " + debug_table_iiiiiiii[x] + "  iiiiiiiii: " + debug_table_iiiiiiiii[x] + "  ii: " + debug_table_ii[x] + "  i: " + debug_table_i[x] + "  viiii: " + debug_table_viiii[x] + "  viii: " + debug_table_viii[x] + "  iiiiif: " + debug_table_iiiiif[x] + "  viiiii: " + debug_table_viiiii[x] + "  viiiiii: " + debug_table_viiiiii[x] + "  vii: " + debug_table_vii[x] + "  iiiiidii: " + debug_table_iiiiidii[x] + "  viiiiiii: " + debug_table_viiiiiii[x] + "  jiji: " + debug_table_jiji[x] + "  viif: " + debug_table_viif[x] + "  viiiiiiii: " + debug_table_viiiiiiii[x] + "  vfi: " + debug_table_vfi[x] + "  vif: " + debug_table_vif[x] + "  if: " + debug_table_if[x] + "  ji: " + debug_table_ji[x] + "  vi: " + debug_table_vi[x] + "  viiiiiiiii: " + debug_table_viiiiiiiii[x] + "  viff: " + debug_table_viff[x] + "  viiiiiiiiii: " + debug_table_viiiiiiiiii[x] + "  vff: " + debug_table_vff[x] + "  vifff: " + debug_table_vifff[x] + "  vf: " + debug_table_vf[x] + "  viffff: " + debug_table_viffff[x] + "  vffff: " + debug_table_vffff[x] + "  viiiiiiiiiii: " + debug_table_viiiiiiiiiii[x] + "  X: " + debug_table_X[x] + "  j: " + debug_table_j[x] + "  v: " + debug_table_v[x] + "  "); abort(x) }

function nullFunc_j(x) { err("Invalid function pointer '" + x + "' called with signature 'j'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  err("This pointer might make sense in another type signature: ji: " + debug_table_ji[x] + "  jiji: " + debug_table_jiji[x] + "  X: " + debug_table_X[x] + "  i: " + debug_table_i[x] + "  v: " + debug_table_v[x] + "  if: " + debug_table_if[x] + "  ii: " + debug_table_ii[x] + "  vf: " + debug_table_vf[x] + "  vi: " + debug_table_vi[x] + "  iii: " + debug_table_iii[x] + "  vff: " + debug_table_vff[x] + "  vfi: " + debug_table_vfi[x] + "  vif: " + debug_table_vif[x] + "  vii: " + debug_table_vii[x] + "  iiii: " + debug_table_iiii[x] + "  viff: " + debug_table_viff[x] + "  viif: " + debug_table_viif[x] + "  viii: " + debug_table_viii[x] + "  iiiii: " + debug_table_iiiii[x] + "  vffff: " + debug_table_vffff[x] + "  vifff: " + debug_table_vifff[x] + "  viiii: " + debug_table_viiii[x] + "  iiiiif: " + debug_table_iiiiif[x] + "  iiiiii: " + debug_table_iiiiii[x] + "  viffff: " + debug_table_viffff[x] + "  viiiii: " + debug_table_viiiii[x] + "  iiiiiii: " + debug_table_iiiiiii[x] + "  viiiiii: " + debug_table_viiiiii[x] + "  iiiiidii: " + debug_table_iiiiidii[x] + "  iiiiiiii: " + debug_table_iiiiiiii[x] + "  viiiiiii: " + debug_table_viiiiiii[x] + "  iiiiiiiii: " + debug_table_iiiiiiiii[x] + "  viiiiiiii: " + debug_table_viiiiiiii[x] + "  iiiiiiiiii: " + debug_table_iiiiiiiiii[x] + "  viiiiiiiii: " + debug_table_viiiiiiiii[x] + "  viiiiiiiiii: " + debug_table_viiiiiiiiii[x] + "  viiiiiiiiiii: " + debug_table_viiiiiiiiiii[x] + "  "); abort(x) }

function nullFunc_ji(x) { err("Invalid function pointer '" + x + "' called with signature 'ji'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  err("This pointer might make sense in another type signature: j: " + debug_table_j[x] + "  jiji: " + debug_table_jiji[x] + "  i: " + debug_table_i[x] + "  ii: " + debug_table_ii[x] + "  vi: " + debug_table_vi[x] + "  if: " + debug_table_if[x] + "  iii: " + debug_table_iii[x] + "  vif: " + debug_table_vif[x] + "  vii: " + debug_table_vii[x] + "  vfi: " + debug_table_vfi[x] + "  X: " + debug_table_X[x] + "  v: " + debug_table_v[x] + "  vf: " + debug_table_vf[x] + "  iiii: " + debug_table_iiii[x] + "  viff: " + debug_table_viff[x] + "  viif: " + debug_table_viif[x] + "  viii: " + debug_table_viii[x] + "  vff: " + debug_table_vff[x] + "  iiiii: " + debug_table_iiiii[x] + "  vifff: " + debug_table_vifff[x] + "  viiii: " + debug_table_viiii[x] + "  iiiiif: " + debug_table_iiiiif[x] + "  iiiiii: " + debug_table_iiiiii[x] + "  viffff: " + debug_table_viffff[x] + "  viiiii: " + debug_table_viiiii[x] + "  vffff: " + debug_table_vffff[x] + "  iiiiiii: " + debug_table_iiiiiii[x] + "  viiiiii: " + debug_table_viiiiii[x] + "  iiiiidii: " + debug_table_iiiiidii[x] + "  iiiiiiii: " + debug_table_iiiiiiii[x] + "  viiiiiii: " + debug_table_viiiiiii[x] + "  iiiiiiiii: " + debug_table_iiiiiiiii[x] + "  viiiiiiii: " + debug_table_viiiiiiii[x] + "  iiiiiiiiii: " + debug_table_iiiiiiiiii[x] + "  viiiiiiiii: " + debug_table_viiiiiiiii[x] + "  viiiiiiiiii: " + debug_table_viiiiiiiiii[x] + "  viiiiiiiiiii: " + debug_table_viiiiiiiiiii[x] + "  "); abort(x) }

function nullFunc_jiji(x) { err("Invalid function pointer '" + x + "' called with signature 'jiji'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  err("This pointer might make sense in another type signature: ji: " + debug_table_ji[x] + "  j: " + debug_table_j[x] + "  ii: " + debug_table_ii[x] + "  iii: " + debug_table_iii[x] + "  vii: " + debug_table_vii[x] + "  vi: " + debug_table_vi[x] + "  if: " + debug_table_if[x] + "  iiii: " + debug_table_iiii[x] + "  viii: " + debug_table_viii[x] + "  i: " + debug_table_i[x] + "  viif: " + debug_table_viif[x] + "  vif: " + debug_table_vif[x] + "  vfi: " + debug_table_vfi[x] + "  iiiii: " + debug_table_iiiii[x] + "  viiii: " + debug_table_viiii[x] + "  viff: " + debug_table_viff[x] + "  vf: " + debug_table_vf[x] + "  X: " + debug_table_X[x] + "  v: " + debug_table_v[x] + "  vff: " + debug_table_vff[x] + "  iiiiif: " + debug_table_iiiiif[x] + "  iiiiii: " + debug_table_iiiiii[x] + "  viiiii: " + debug_table_viiiii[x] + "  vifff: " + debug_table_vifff[x] + "  viffff: " + debug_table_viffff[x] + "  iiiiiii: " + debug_table_iiiiiii[x] + "  viiiiii: " + debug_table_viiiiii[x] + "  vffff: " + debug_table_vffff[x] + "  iiiiidii: " + debug_table_iiiiidii[x] + "  iiiiiiii: " + debug_table_iiiiiiii[x] + "  viiiiiii: " + debug_table_viiiiiii[x] + "  iiiiiiiii: " + debug_table_iiiiiiiii[x] + "  viiiiiiii: " + debug_table_viiiiiiii[x] + "  iiiiiiiiii: " + debug_table_iiiiiiiiii[x] + "  viiiiiiiii: " + debug_table_viiiiiiiii[x] + "  viiiiiiiiii: " + debug_table_viiiiiiiiii[x] + "  viiiiiiiiiii: " + debug_table_viiiiiiiiiii[x] + "  "); abort(x) }

function nullFunc_v(x) { err("Invalid function pointer '" + x + "' called with signature 'v'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  err("This pointer might make sense in another type signature: vf: " + debug_table_vf[x] + "  vi: " + debug_table_vi[x] + "  vff: " + debug_table_vff[x] + "  vfi: " + debug_table_vfi[x] + "  vif: " + debug_table_vif[x] + "  vii: " + debug_table_vii[x] + "  viff: " + debug_table_viff[x] + "  viif: " + debug_table_viif[x] + "  viii: " + debug_table_viii[x] + "  vffff: " + debug_table_vffff[x] + "  vifff: " + debug_table_vifff[x] + "  viiii: " + debug_table_viiii[x] + "  viffff: " + debug_table_viffff[x] + "  viiiii: " + debug_table_viiiii[x] + "  viiiiii: " + debug_table_viiiiii[x] + "  viiiiiii: " + debug_table_viiiiiii[x] + "  viiiiiiii: " + debug_table_viiiiiiii[x] + "  viiiiiiiii: " + debug_table_viiiiiiiii[x] + "  viiiiiiiiii: " + debug_table_viiiiiiiiii[x] + "  viiiiiiiiiii: " + debug_table_viiiiiiiiiii[x] + "  X: " + debug_table_X[x] + "  i: " + debug_table_i[x] + "  j: " + debug_table_j[x] + "  if: " + debug_table_if[x] + "  ii: " + debug_table_ii[x] + "  ji: " + debug_table_ji[x] + "  iii: " + debug_table_iii[x] + "  iiii: " + debug_table_iiii[x] + "  jiji: " + debug_table_jiji[x] + "  iiiii: " + debug_table_iiiii[x] + "  iiiiif: " + debug_table_iiiiif[x] + "  iiiiii: " + debug_table_iiiiii[x] + "  iiiiiii: " + debug_table_iiiiiii[x] + "  iiiiidii: " + debug_table_iiiiidii[x] + "  iiiiiiii: " + debug_table_iiiiiiii[x] + "  iiiiiiiii: " + debug_table_iiiiiiiii[x] + "  iiiiiiiiii: " + debug_table_iiiiiiiiii[x] + "  "); abort(x) }

function nullFunc_vf(x) { err("Invalid function pointer '" + x + "' called with signature 'vf'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  err("This pointer might make sense in another type signature: v: " + debug_table_v[x] + "  vff: " + debug_table_vff[x] + "  vfi: " + debug_table_vfi[x] + "  vffff: " + debug_table_vffff[x] + "  vif: " + debug_table_vif[x] + "  if: " + debug_table_if[x] + "  vi: " + debug_table_vi[x] + "  viff: " + debug_table_viff[x] + "  viif: " + debug_table_viif[x] + "  vii: " + debug_table_vii[x] + "  X: " + debug_table_X[x] + "  i: " + debug_table_i[x] + "  j: " + debug_table_j[x] + "  ii: " + debug_table_ii[x] + "  ji: " + debug_table_ji[x] + "  vifff: " + debug_table_vifff[x] + "  viii: " + debug_table_viii[x] + "  iii: " + debug_table_iii[x] + "  viffff: " + debug_table_viffff[x] + "  viiii: " + debug_table_viiii[x] + "  iiii: " + debug_table_iiii[x] + "  jiji: " + debug_table_jiji[x] + "  viiiii: " + debug_table_viiiii[x] + "  iiiiif: " + debug_table_iiiiif[x] + "  iiiii: " + debug_table_iiiii[x] + "  viiiiii: " + debug_table_viiiiii[x] + "  iiiiii: " + debug_table_iiiiii[x] + "  viiiiiii: " + debug_table_viiiiiii[x] + "  iiiiiii: " + debug_table_iiiiiii[x] + "  iiiiidii: " + debug_table_iiiiidii[x] + "  iiiiiiii: " + debug_table_iiiiiiii[x] + "  viiiiiiii: " + debug_table_viiiiiiii[x] + "  iiiiiiiii: " + debug_table_iiiiiiiii[x] + "  viiiiiiiii: " + debug_table_viiiiiiiii[x] + "  iiiiiiiiii: " + debug_table_iiiiiiiiii[x] + "  viiiiiiiiii: " + debug_table_viiiiiiiiii[x] + "  viiiiiiiiiii: " + debug_table_viiiiiiiiiii[x] + "  "); abort(x) }

function nullFunc_vff(x) { err("Invalid function pointer '" + x + "' called with signature 'vff'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  err("This pointer might make sense in another type signature: vf: " + debug_table_vf[x] + "  v: " + debug_table_v[x] + "  vffff: " + debug_table_vffff[x] + "  viff: " + debug_table_viff[x] + "  vfi: " + debug_table_vfi[x] + "  vif: " + debug_table_vif[x] + "  if: " + debug_table_if[x] + "  vi: " + debug_table_vi[x] + "  vifff: " + debug_table_vifff[x] + "  viif: " + debug_table_viif[x] + "  vii: " + debug_table_vii[x] + "  viffff: " + debug_table_viffff[x] + "  viii: " + debug_table_viii[x] + "  ii: " + debug_table_ii[x] + "  ji: " + debug_table_ji[x] + "  X: " + debug_table_X[x] + "  i: " + debug_table_i[x] + "  j: " + debug_table_j[x] + "  iii: " + debug_table_iii[x] + "  viiii: " + debug_table_viiii[x] + "  iiii: " + debug_table_iiii[x] + "  jiji: " + debug_table_jiji[x] + "  viiiii: " + debug_table_viiiii[x] + "  iiiiif: " + debug_table_iiiiif[x] + "  iiiii: " + debug_table_iiiii[x] + "  viiiiii: " + debug_table_viiiiii[x] + "  iiiiii: " + debug_table_iiiiii[x] + "  viiiiiii: " + debug_table_viiiiiii[x] + "  iiiiiii: " + debug_table_iiiiiii[x] + "  iiiiidii: " + debug_table_iiiiidii[x] + "  iiiiiiii: " + debug_table_iiiiiiii[x] + "  viiiiiiii: " + debug_table_viiiiiiii[x] + "  iiiiiiiii: " + debug_table_iiiiiiiii[x] + "  viiiiiiiii: " + debug_table_viiiiiiiii[x] + "  iiiiiiiiii: " + debug_table_iiiiiiiiii[x] + "  viiiiiiiiii: " + debug_table_viiiiiiiiii[x] + "  viiiiiiiiiii: " + debug_table_viiiiiiiiiii[x] + "  "); abort(x) }

function nullFunc_vffff(x) { err("Invalid function pointer '" + x + "' called with signature 'vffff'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  err("This pointer might make sense in another type signature: vff: " + debug_table_vff[x] + "  vf: " + debug_table_vf[x] + "  v: " + debug_table_v[x] + "  vifff: " + debug_table_vifff[x] + "  viff: " + debug_table_viff[x] + "  viffff: " + debug_table_viffff[x] + "  vfi: " + debug_table_vfi[x] + "  vif: " + debug_table_vif[x] + "  if: " + debug_table_if[x] + "  vi: " + debug_table_vi[x] + "  viif: " + debug_table_viif[x] + "  vii: " + debug_table_vii[x] + "  viii: " + debug_table_viii[x] + "  ii: " + debug_table_ii[x] + "  ji: " + debug_table_ji[x] + "  iii: " + debug_table_iii[x] + "  viiii: " + debug_table_viiii[x] + "  X: " + debug_table_X[x] + "  i: " + debug_table_i[x] + "  j: " + debug_table_j[x] + "  iiii: " + debug_table_iiii[x] + "  jiji: " + debug_table_jiji[x] + "  viiiii: " + debug_table_viiiii[x] + "  iiiiif: " + debug_table_iiiiif[x] + "  iiiii: " + debug_table_iiiii[x] + "  viiiiii: " + debug_table_viiiiii[x] + "  iiiiii: " + debug_table_iiiiii[x] + "  iiiiiii: " + debug_table_iiiiiii[x] + "  viiiiiii: " + debug_table_viiiiiii[x] + "  iiiiidii: " + debug_table_iiiiidii[x] + "  iiiiiiii: " + debug_table_iiiiiiii[x] + "  viiiiiiii: " + debug_table_viiiiiiii[x] + "  iiiiiiiii: " + debug_table_iiiiiiiii[x] + "  viiiiiiiii: " + debug_table_viiiiiiiii[x] + "  iiiiiiiiii: " + debug_table_iiiiiiiiii[x] + "  viiiiiiiiii: " + debug_table_viiiiiiiiii[x] + "  viiiiiiiiiii: " + debug_table_viiiiiiiiiii[x] + "  "); abort(x) }

function nullFunc_vfi(x) { err("Invalid function pointer '" + x + "' called with signature 'vfi'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  err("This pointer might make sense in another type signature: vf: " + debug_table_vf[x] + "  v: " + debug_table_v[x] + "  vi: " + debug_table_vi[x] + "  vff: " + debug_table_vff[x] + "  vii: " + debug_table_vii[x] + "  vif: " + debug_table_vif[x] + "  i: " + debug_table_i[x] + "  if: " + debug_table_if[x] + "  ii: " + debug_table_ii[x] + "  ji: " + debug_table_ji[x] + "  viif: " + debug_table_viif[x] + "  viii: " + debug_table_viii[x] + "  viff: " + debug_table_viff[x] + "  iii: " + debug_table_iii[x] + "  vffff: " + debug_table_vffff[x] + "  viiii: " + debug_table_viiii[x] + "  vifff: " + debug_table_vifff[x] + "  iiii: " + debug_table_iiii[x] + "  jiji: " + debug_table_jiji[x] + "  X: " + debug_table_X[x] + "  j: " + debug_table_j[x] + "  viiiii: " + debug_table_viiiii[x] + "  viffff: " + debug_table_viffff[x] + "  iiiii: " + debug_table_iiiii[x] + "  viiiiii: " + debug_table_viiiiii[x] + "  iiiiif: " + debug_table_iiiiif[x] + "  iiiiii: " + debug_table_iiiiii[x] + "  iiiiiii: " + debug_table_iiiiiii[x] + "  viiiiiii: " + debug_table_viiiiiii[x] + "  iiiiidii: " + debug_table_iiiiidii[x] + "  iiiiiiii: " + debug_table_iiiiiiii[x] + "  viiiiiiii: " + debug_table_viiiiiiii[x] + "  iiiiiiiii: " + debug_table_iiiiiiiii[x] + "  viiiiiiiii: " + debug_table_viiiiiiiii[x] + "  iiiiiiiiii: " + debug_table_iiiiiiiiii[x] + "  viiiiiiiiii: " + debug_table_viiiiiiiiii[x] + "  viiiiiiiiiii: " + debug_table_viiiiiiiiiii[x] + "  "); abort(x) }

function nullFunc_vi(x) { err("Invalid function pointer '" + x + "' called with signature 'vi'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  err("This pointer might make sense in another type signature: v: " + debug_table_v[x] + "  vif: " + debug_table_vif[x] + "  vii: " + debug_table_vii[x] + "  viff: " + debug_table_viff[x] + "  viif: " + debug_table_viif[x] + "  viii: " + debug_table_viii[x] + "  vifff: " + debug_table_vifff[x] + "  viiii: " + debug_table_viiii[x] + "  viffff: " + debug_table_viffff[x] + "  viiiii: " + debug_table_viiiii[x] + "  viiiiii: " + debug_table_viiiiii[x] + "  viiiiiii: " + debug_table_viiiiiii[x] + "  viiiiiiii: " + debug_table_viiiiiiii[x] + "  viiiiiiiii: " + debug_table_viiiiiiiii[x] + "  viiiiiiiiii: " + debug_table_viiiiiiiiii[x] + "  viiiiiiiiiii: " + debug_table_viiiiiiiiiii[x] + "  i: " + debug_table_i[x] + "  vfi: " + debug_table_vfi[x] + "  ii: " + debug_table_ii[x] + "  ji: " + debug_table_ji[x] + "  vf: " + debug_table_vf[x] + "  if: " + debug_table_if[x] + "  iii: " + debug_table_iii[x] + "  vff: " + debug_table_vff[x] + "  X: " + debug_table_X[x] + "  j: " + debug_table_j[x] + "  iiii: " + debug_table_iiii[x] + "  jiji: " + debug_table_jiji[x] + "  iiiii: " + debug_table_iiiii[x] + "  vffff: " + debug_table_vffff[x] + "  iiiiif: " + debug_table_iiiiif[x] + "  iiiiii: " + debug_table_iiiiii[x] + "  iiiiiii: " + debug_table_iiiiiii[x] + "  iiiiidii: " + debug_table_iiiiidii[x] + "  iiiiiiii: " + debug_table_iiiiiiii[x] + "  iiiiiiiii: " + debug_table_iiiiiiiii[x] + "  iiiiiiiiii: " + debug_table_iiiiiiiiii[x] + "  "); abort(x) }

function nullFunc_vif(x) { err("Invalid function pointer '" + x + "' called with signature 'vif'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  err("This pointer might make sense in another type signature: vi: " + debug_table_vi[x] + "  viff: " + debug_table_viff[x] + "  v: " + debug_table_v[x] + "  vifff: " + debug_table_vifff[x] + "  viffff: " + debug_table_viffff[x] + "  vf: " + debug_table_vf[x] + "  if: " + debug_table_if[x] + "  viif: " + debug_table_viif[x] + "  vff: " + debug_table_vff[x] + "  vii: " + debug_table_vii[x] + "  vfi: " + debug_table_vfi[x] + "  i: " + debug_table_i[x] + "  ii: " + debug_table_ii[x] + "  ji: " + debug_table_ji[x] + "  viii: " + debug_table_viii[x] + "  iii: " + debug_table_iii[x] + "  vffff: " + debug_table_vffff[x] + "  viiii: " + debug_table_viiii[x] + "  iiii: " + debug_table_iiii[x] + "  jiji: " + debug_table_jiji[x] + "  X: " + debug_table_X[x] + "  j: " + debug_table_j[x] + "  viiiii: " + debug_table_viiiii[x] + "  iiiiif: " + debug_table_iiiiif[x] + "  iiiii: " + debug_table_iiiii[x] + "  viiiiii: " + debug_table_viiiiii[x] + "  iiiiii: " + debug_table_iiiiii[x] + "  iiiiiii: " + debug_table_iiiiiii[x] + "  viiiiiii: " + debug_table_viiiiiii[x] + "  iiiiidii: " + debug_table_iiiiidii[x] + "  iiiiiiii: " + debug_table_iiiiiiii[x] + "  viiiiiiii: " + debug_table_viiiiiiii[x] + "  iiiiiiiii: " + debug_table_iiiiiiiii[x] + "  viiiiiiiii: " + debug_table_viiiiiiiii[x] + "  iiiiiiiiii: " + debug_table_iiiiiiiiii[x] + "  viiiiiiiiii: " + debug_table_viiiiiiiiii[x] + "  viiiiiiiiiii: " + debug_table_viiiiiiiiiii[x] + "  "); abort(x) }

function nullFunc_viff(x) { err("Invalid function pointer '" + x + "' called with signature 'viff'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  err("This pointer might make sense in another type signature: vif: " + debug_table_vif[x] + "  vi: " + debug_table_vi[x] + "  vifff: " + debug_table_vifff[x] + "  v: " + debug_table_v[x] + "  viffff: " + debug_table_viffff[x] + "  vff: " + debug_table_vff[x] + "  vf: " + debug_table_vf[x] + "  if: " + debug_table_if[x] + "  viif: " + debug_table_viif[x] + "  vii: " + debug_table_vii[x] + "  vfi: " + debug_table_vfi[x] + "  ii: " + debug_table_ii[x] + "  ji: " + debug_table_ji[x] + "  viii: " + debug_table_viii[x] + "  vffff: " + debug_table_vffff[x] + "  i: " + debug_table_i[x] + "  iii: " + debug_table_iii[x] + "  viiii: " + debug_table_viiii[x] + "  iiii: " + debug_table_iiii[x] + "  jiji: " + debug_table_jiji[x] + "  X: " + debug_table_X[x] + "  j: " + debug_table_j[x] + "  viiiii: " + debug_table_viiiii[x] + "  iiiii: " + debug_table_iiiii[x] + "  iiiiif: " + debug_table_iiiiif[x] + "  iiiiii: " + debug_table_iiiiii[x] + "  viiiiii: " + debug_table_viiiiii[x] + "  iiiiiii: " + debug_table_iiiiiii[x] + "  viiiiiii: " + debug_table_viiiiiii[x] + "  iiiiidii: " + debug_table_iiiiidii[x] + "  iiiiiiii: " + debug_table_iiiiiiii[x] + "  viiiiiiii: " + debug_table_viiiiiiii[x] + "  iiiiiiiii: " + debug_table_iiiiiiiii[x] + "  viiiiiiiii: " + debug_table_viiiiiiiii[x] + "  iiiiiiiiii: " + debug_table_iiiiiiiiii[x] + "  viiiiiiiiii: " + debug_table_viiiiiiiiii[x] + "  viiiiiiiiiii: " + debug_table_viiiiiiiiiii[x] + "  "); abort(x) }

function nullFunc_vifff(x) { err("Invalid function pointer '" + x + "' called with signature 'vifff'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  err("This pointer might make sense in another type signature: viff: " + debug_table_viff[x] + "  vif: " + debug_table_vif[x] + "  vi: " + debug_table_vi[x] + "  viffff: " + debug_table_viffff[x] + "  v: " + debug_table_v[x] + "  vff: " + debug_table_vff[x] + "  vf: " + debug_table_vf[x] + "  if: " + debug_table_if[x] + "  vffff: " + debug_table_vffff[x] + "  viif: " + debug_table_viif[x] + "  vii: " + debug_table_vii[x] + "  vfi: " + debug_table_vfi[x] + "  ii: " + debug_table_ii[x] + "  ji: " + debug_table_ji[x] + "  viii: " + debug_table_viii[x] + "  iii: " + debug_table_iii[x] + "  i: " + debug_table_i[x] + "  viiii: " + debug_table_viiii[x] + "  iiii: " + debug_table_iiii[x] + "  jiji: " + debug_table_jiji[x] + "  iiiii: " + debug_table_iiiii[x] + "  viiiii: " + debug_table_viiiii[x] + "  iiiiif: " + debug_table_iiiiif[x] + "  X: " + debug_table_X[x] + "  j: " + debug_table_j[x] + "  iiiiii: " + debug_table_iiiiii[x] + "  viiiiii: " + debug_table_viiiiii[x] + "  iiiiiii: " + debug_table_iiiiiii[x] + "  viiiiiii: " + debug_table_viiiiiii[x] + "  iiiiidii: " + debug_table_iiiiidii[x] + "  iiiiiiii: " + debug_table_iiiiiiii[x] + "  viiiiiiii: " + debug_table_viiiiiiii[x] + "  iiiiiiiii: " + debug_table_iiiiiiiii[x] + "  viiiiiiiii: " + debug_table_viiiiiiiii[x] + "  iiiiiiiiii: " + debug_table_iiiiiiiiii[x] + "  viiiiiiiiii: " + debug_table_viiiiiiiiii[x] + "  viiiiiiiiiii: " + debug_table_viiiiiiiiiii[x] + "  "); abort(x) }

function nullFunc_viffff(x) { err("Invalid function pointer '" + x + "' called with signature 'viffff'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  err("This pointer might make sense in another type signature: viff: " + debug_table_viff[x] + "  vifff: " + debug_table_vifff[x] + "  vif: " + debug_table_vif[x] + "  vi: " + debug_table_vi[x] + "  v: " + debug_table_v[x] + "  vffff: " + debug_table_vffff[x] + "  vff: " + debug_table_vff[x] + "  vf: " + debug_table_vf[x] + "  if: " + debug_table_if[x] + "  viif: " + debug_table_viif[x] + "  vii: " + debug_table_vii[x] + "  vfi: " + debug_table_vfi[x] + "  viii: " + debug_table_viii[x] + "  ii: " + debug_table_ii[x] + "  ji: " + debug_table_ji[x] + "  iii: " + debug_table_iii[x] + "  viiii: " + debug_table_viiii[x] + "  i: " + debug_table_i[x] + "  iiii: " + debug_table_iiii[x] + "  jiji: " + debug_table_jiji[x] + "  iiiiif: " + debug_table_iiiiif[x] + "  viiiii: " + debug_table_viiiii[x] + "  iiiii: " + debug_table_iiiii[x] + "  X: " + debug_table_X[x] + "  j: " + debug_table_j[x] + "  iiiiii: " + debug_table_iiiiii[x] + "  viiiiii: " + debug_table_viiiiii[x] + "  iiiiiii: " + debug_table_iiiiiii[x] + "  viiiiiii: " + debug_table_viiiiiii[x] + "  iiiiidii: " + debug_table_iiiiidii[x] + "  iiiiiiii: " + debug_table_iiiiiiii[x] + "  viiiiiiii: " + debug_table_viiiiiiii[x] + "  iiiiiiiii: " + debug_table_iiiiiiiii[x] + "  viiiiiiiii: " + debug_table_viiiiiiiii[x] + "  iiiiiiiiii: " + debug_table_iiiiiiiiii[x] + "  viiiiiiiiii: " + debug_table_viiiiiiiiii[x] + "  viiiiiiiiiii: " + debug_table_viiiiiiiiiii[x] + "  "); abort(x) }

function nullFunc_vii(x) { err("Invalid function pointer '" + x + "' called with signature 'vii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  err("This pointer might make sense in another type signature: vi: " + debug_table_vi[x] + "  viif: " + debug_table_viif[x] + "  viii: " + debug_table_viii[x] + "  v: " + debug_table_v[x] + "  viiii: " + debug_table_viiii[x] + "  viiiii: " + debug_table_viiiii[x] + "  viiiiii: " + debug_table_viiiiii[x] + "  viiiiiii: " + debug_table_viiiiiii[x] + "  viiiiiiii: " + debug_table_viiiiiiii[x] + "  viiiiiiiii: " + debug_table_viiiiiiiii[x] + "  viiiiiiiiii: " + debug_table_viiiiiiiiii[x] + "  viiiiiiiiiii: " + debug_table_viiiiiiiiiii[x] + "  ii: " + debug_table_ii[x] + "  iii: " + debug_table_iii[x] + "  vfi: " + debug_table_vfi[x] + "  vif: " + debug_table_vif[x] + "  i: " + debug_table_i[x] + "  ji: " + debug_table_ji[x] + "  vf: " + debug_table_vf[x] + "  if: " + debug_table_if[x] + "  iiii: " + debug_table_iiii[x] + "  viff: " + debug_table_viff[x] + "  jiji: " + debug_table_jiji[x] + "  vff: " + debug_table_vff[x] + "  iiiii: " + debug_table_iiiii[x] + "  vifff: " + debug_table_vifff[x] + "  X: " + debug_table_X[x] + "  j: " + debug_table_j[x] + "  iiiiif: " + debug_table_iiiiif[x] + "  iiiiii: " + debug_table_iiiiii[x] + "  viffff: " + debug_table_viffff[x] + "  vffff: " + debug_table_vffff[x] + "  iiiiiii: " + debug_table_iiiiiii[x] + "  iiiiidii: " + debug_table_iiiiidii[x] + "  iiiiiiii: " + debug_table_iiiiiiii[x] + "  iiiiiiiii: " + debug_table_iiiiiiiii[x] + "  iiiiiiiiii: " + debug_table_iiiiiiiiii[x] + "  "); abort(x) }

function nullFunc_viif(x) { err("Invalid function pointer '" + x + "' called with signature 'viif'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  err("This pointer might make sense in another type signature: vii: " + debug_table_vii[x] + "  vi: " + debug_table_vi[x] + "  v: " + debug_table_v[x] + "  vif: " + debug_table_vif[x] + "  ii: " + debug_table_ii[x] + "  vf: " + debug_table_vf[x] + "  if: " + debug_table_if[x] + "  viff: " + debug_table_viff[x] + "  viii: " + debug_table_viii[x] + "  iii: " + debug_table_iii[x] + "  vfi: " + debug_table_vfi[x] + "  vff: " + debug_table_vff[x] + "  ji: " + debug_table_ji[x] + "  iiii: " + debug_table_iiii[x] + "  vifff: " + debug_table_vifff[x] + "  viiii: " + debug_table_viiii[x] + "  i: " + debug_table_i[x] + "  jiji: " + debug_table_jiji[x] + "  iiiii: " + debug_table_iiiii[x] + "  vffff: " + debug_table_vffff[x] + "  viffff: " + debug_table_viffff[x] + "  viiiii: " + debug_table_viiiii[x] + "  iiiiif: " + debug_table_iiiiif[x] + "  X: " + debug_table_X[x] + "  j: " + debug_table_j[x] + "  iiiiii: " + debug_table_iiiiii[x] + "  viiiiii: " + debug_table_viiiiii[x] + "  iiiiiii: " + debug_table_iiiiiii[x] + "  viiiiiii: " + debug_table_viiiiiii[x] + "  iiiiidii: " + debug_table_iiiiidii[x] + "  iiiiiiii: " + debug_table_iiiiiiii[x] + "  viiiiiiii: " + debug_table_viiiiiiii[x] + "  iiiiiiiii: " + debug_table_iiiiiiiii[x] + "  viiiiiiiii: " + debug_table_viiiiiiiii[x] + "  iiiiiiiiii: " + debug_table_iiiiiiiiii[x] + "  viiiiiiiiii: " + debug_table_viiiiiiiiii[x] + "  viiiiiiiiiii: " + debug_table_viiiiiiiiiii[x] + "  "); abort(x) }

function nullFunc_viii(x) { err("Invalid function pointer '" + x + "' called with signature 'viii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  err("This pointer might make sense in another type signature: vii: " + debug_table_vii[x] + "  vi: " + debug_table_vi[x] + "  viiii: " + debug_table_viiii[x] + "  v: " + debug_table_v[x] + "  viiiii: " + debug_table_viiiii[x] + "  viiiiii: " + debug_table_viiiiii[x] + "  viiiiiii: " + debug_table_viiiiiii[x] + "  viiiiiiii: " + debug_table_viiiiiiii[x] + "  viiiiiiiii: " + debug_table_viiiiiiiii[x] + "  viiiiiiiiii: " + debug_table_viiiiiiiiii[x] + "  viiiiiiiiiii: " + debug_table_viiiiiiiiiii[x] + "  iii: " + debug_table_iii[x] + "  ii: " + debug_table_ii[x] + "  iiii: " + debug_table_iiii[x] + "  viif: " + debug_table_viif[x] + "  vfi: " + debug_table_vfi[x] + "  vif: " + debug_table_vif[x] + "  ji: " + debug_table_ji[x] + "  vf: " + debug_table_vf[x] + "  if: " + debug_table_if[x] + "  jiji: " + debug_table_jiji[x] + "  viff: " + debug_table_viff[x] + "  iiiii: " + debug_table_iiiii[x] + "  i: " + debug_table_i[x] + "  vff: " + debug_table_vff[x] + "  vifff: " + debug_table_vifff[x] + "  iiiiif: " + debug_table_iiiiif[x] + "  iiiiii: " + debug_table_iiiiii[x] + "  X: " + debug_table_X[x] + "  j: " + debug_table_j[x] + "  viffff: " + debug_table_viffff[x] + "  vffff: " + debug_table_vffff[x] + "  iiiiiii: " + debug_table_iiiiiii[x] + "  iiiiidii: " + debug_table_iiiiidii[x] + "  iiiiiiii: " + debug_table_iiiiiiii[x] + "  iiiiiiiii: " + debug_table_iiiiiiiii[x] + "  iiiiiiiiii: " + debug_table_iiiiiiiiii[x] + "  "); abort(x) }

function nullFunc_viiii(x) { err("Invalid function pointer '" + x + "' called with signature 'viiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  err("This pointer might make sense in another type signature: viii: " + debug_table_viii[x] + "  vii: " + debug_table_vii[x] + "  vi: " + debug_table_vi[x] + "  viiiii: " + debug_table_viiiii[x] + "  viiiiii: " + debug_table_viiiiii[x] + "  v: " + debug_table_v[x] + "  viiiiiii: " + debug_table_viiiiiii[x] + "  viiiiiiii: " + debug_table_viiiiiiii[x] + "  viiiiiiiii: " + debug_table_viiiiiiiii[x] + "  viiiiiiiiii: " + debug_table_viiiiiiiiii[x] + "  viiiiiiiiiii: " + debug_table_viiiiiiiiiii[x] + "  iiii: " + debug_table_iiii[x] + "  iii: " + debug_table_iii[x] + "  ii: " + debug_table_ii[x] + "  iiiii: " + debug_table_iiiii[x] + "  viif: " + debug_table_viif[x] + "  vfi: " + debug_table_vfi[x] + "  vif: " + debug_table_vif[x] + "  ji: " + debug_table_ji[x] + "  vf: " + debug_table_vf[x] + "  jiji: " + debug_table_jiji[x] + "  viff: " + debug_table_viff[x] + "  iiiiif: " + debug_table_iiiiif[x] + "  iiiiii: " + debug_table_iiiiii[x] + "  if: " + debug_table_if[x] + "  vff: " + debug_table_vff[x] + "  i: " + debug_table_i[x] + "  vifff: " + debug_table_vifff[x] + "  iiiiiii: " + debug_table_iiiiiii[x] + "  vffff: " + debug_table_vffff[x] + "  viffff: " + debug_table_viffff[x] + "  X: " + debug_table_X[x] + "  j: " + debug_table_j[x] + "  iiiiidii: " + debug_table_iiiiidii[x] + "  iiiiiiii: " + debug_table_iiiiiiii[x] + "  iiiiiiiii: " + debug_table_iiiiiiiii[x] + "  iiiiiiiiii: " + debug_table_iiiiiiiiii[x] + "  "); abort(x) }

function nullFunc_viiiii(x) { err("Invalid function pointer '" + x + "' called with signature 'viiiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  err("This pointer might make sense in another type signature: viii: " + debug_table_viii[x] + "  viiii: " + debug_table_viiii[x] + "  vii: " + debug_table_vii[x] + "  vi: " + debug_table_vi[x] + "  viiiiii: " + debug_table_viiiiii[x] + "  viiiiiii: " + debug_table_viiiiiii[x] + "  v: " + debug_table_v[x] + "  viiiiiiii: " + debug_table_viiiiiiii[x] + "  viiiiiiiii: " + debug_table_viiiiiiiii[x] + "  viiiiiiiiii: " + debug_table_viiiiiiiiii[x] + "  viiiiiiiiiii: " + debug_table_viiiiiiiiiii[x] + "  iiii: " + debug_table_iiii[x] + "  iiiii: " + debug_table_iiiii[x] + "  iii: " + debug_table_iii[x] + "  ii: " + debug_table_ii[x] + "  viif: " + debug_table_viif[x] + "  iiiiii: " + debug_table_iiiiii[x] + "  iiiiif: " + debug_table_iiiiif[x] + "  vfi: " + debug_table_vfi[x] + "  vif: " + debug_table_vif[x] + "  jiji: " + debug_table_jiji[x] + "  viff: " + debug_table_viff[x] + "  ji: " + debug_table_ji[x] + "  vf: " + debug_table_vf[x] + "  iiiiiii: " + debug_table_iiiiiii[x] + "  if: " + debug_table_if[x] + "  vff: " + debug_table_vff[x] + "  vifff: " + debug_table_vifff[x] + "  i: " + debug_table_i[x] + "  iiiiiiii: " + debug_table_iiiiiiii[x] + "  iiiiidii: " + debug_table_iiiiidii[x] + "  viffff: " + debug_table_viffff[x] + "  vffff: " + debug_table_vffff[x] + "  iiiiiiiii: " + debug_table_iiiiiiiii[x] + "  X: " + debug_table_X[x] + "  j: " + debug_table_j[x] + "  iiiiiiiiii: " + debug_table_iiiiiiiiii[x] + "  "); abort(x) }

function nullFunc_viiiiii(x) { err("Invalid function pointer '" + x + "' called with signature 'viiiiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  err("This pointer might make sense in another type signature: viii: " + debug_table_viii[x] + "  viiii: " + debug_table_viiii[x] + "  viiiii: " + debug_table_viiiii[x] + "  vii: " + debug_table_vii[x] + "  vi: " + debug_table_vi[x] + "  viiiiiii: " + debug_table_viiiiiii[x] + "  viiiiiiii: " + debug_table_viiiiiiii[x] + "  v: " + debug_table_v[x] + "  viiiiiiiii: " + debug_table_viiiiiiiii[x] + "  viiiiiiiiii: " + debug_table_viiiiiiiiii[x] + "  viiiiiiiiiii: " + debug_table_viiiiiiiiiii[x] + "  iiii: " + debug_table_iiii[x] + "  iiiii: " + debug_table_iiiii[x] + "  iiiiii: " + debug_table_iiiiii[x] + "  iii: " + debug_table_iii[x] + "  viif: " + debug_table_viif[x] + "  ii: " + debug_table_ii[x] + "  iiiiif: " + debug_table_iiiiif[x] + "  iiiiiii: " + debug_table_iiiiiii[x] + "  vfi: " + debug_table_vfi[x] + "  vif: " + debug_table_vif[x] + "  jiji: " + debug_table_jiji[x] + "  viff: " + debug_table_viff[x] + "  ji: " + debug_table_ji[x] + "  vf: " + debug_table_vf[x] + "  if: " + debug_table_if[x] + "  iiiiiiii: " + debug_table_iiiiiiii[x] + "  vff: " + debug_table_vff[x] + "  iiiiidii: " + debug_table_iiiiidii[x] + "  vifff: " + debug_table_vifff[x] + "  i: " + debug_table_i[x] + "  viffff: " + debug_table_viffff[x] + "  iiiiiiiii: " + debug_table_iiiiiiiii[x] + "  vffff: " + debug_table_vffff[x] + "  iiiiiiiiii: " + debug_table_iiiiiiiiii[x] + "  X: " + debug_table_X[x] + "  j: " + debug_table_j[x] + "  "); abort(x) }

function nullFunc_viiiiiii(x) { err("Invalid function pointer '" + x + "' called with signature 'viiiiiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  err("This pointer might make sense in another type signature: viii: " + debug_table_viii[x] + "  viiii: " + debug_table_viiii[x] + "  viiiii: " + debug_table_viiiii[x] + "  vii: " + debug_table_vii[x] + "  viiiiii: " + debug_table_viiiiii[x] + "  vi: " + debug_table_vi[x] + "  viiiiiiii: " + debug_table_viiiiiiii[x] + "  viiiiiiiii: " + debug_table_viiiiiiiii[x] + "  v: " + debug_table_v[x] + "  viiiiiiiiii: " + debug_table_viiiiiiiiii[x] + "  viiiiiiiiiii: " + debug_table_viiiiiiiiiii[x] + "  iiii: " + debug_table_iiii[x] + "  iiiii: " + debug_table_iiiii[x] + "  iiiiii: " + debug_table_iiiiii[x] + "  iii: " + debug_table_iii[x] + "  iiiiiii: " + debug_table_iiiiiii[x] + "  viif: " + debug_table_viif[x] + "  iiiiif: " + debug_table_iiiiif[x] + "  ii: " + debug_table_ii[x] + "  vfi: " + debug_table_vfi[x] + "  vif: " + debug_table_vif[x] + "  iiiiiiii: " + debug_table_iiiiiiii[x] + "  iiiiidii: " + debug_table_iiiiidii[x] + "  jiji: " + debug_table_jiji[x] + "  viff: " + debug_table_viff[x] + "  ji: " + debug_table_ji[x] + "  vf: " + debug_table_vf[x] + "  if: " + debug_table_if[x] + "  vff: " + debug_table_vff[x] + "  vifff: " + debug_table_vifff[x] + "  iiiiiiiii: " + debug_table_iiiiiiiii[x] + "  viffff: " + debug_table_viffff[x] + "  vffff: " + debug_table_vffff[x] + "  i: " + debug_table_i[x] + "  iiiiiiiiii: " + debug_table_iiiiiiiiii[x] + "  X: " + debug_table_X[x] + "  j: " + debug_table_j[x] + "  "); abort(x) }

function nullFunc_viiiiiiii(x) { err("Invalid function pointer '" + x + "' called with signature 'viiiiiiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  err("This pointer might make sense in another type signature: viii: " + debug_table_viii[x] + "  viiii: " + debug_table_viiii[x] + "  viiiii: " + debug_table_viiiii[x] + "  vii: " + debug_table_vii[x] + "  viiiiii: " + debug_table_viiiiii[x] + "  viiiiiii: " + debug_table_viiiiiii[x] + "  vi: " + debug_table_vi[x] + "  viiiiiiiii: " + debug_table_viiiiiiiii[x] + "  viiiiiiiiii: " + debug_table_viiiiiiiiii[x] + "  v: " + debug_table_v[x] + "  viiiiiiiiiii: " + debug_table_viiiiiiiiiii[x] + "  iiiii: " + debug_table_iiiii[x] + "  iiii: " + debug_table_iiii[x] + "  iiiiii: " + debug_table_iiiiii[x] + "  iii: " + debug_table_iii[x] + "  iiiiiii: " + debug_table_iiiiiii[x] + "  iiiiiiii: " + debug_table_iiiiiiii[x] + "  viif: " + debug_table_viif[x] + "  iiiiif: " + debug_table_iiiiif[x] + "  ii: " + debug_table_ii[x] + "  vfi: " + debug_table_vfi[x] + "  vif: " + debug_table_vif[x] + "  iiiiidii: " + debug_table_iiiiidii[x] + "  jiji: " + debug_table_jiji[x] + "  viff: " + debug_table_viff[x] + "  iiiiiiiii: " + debug_table_iiiiiiiii[x] + "  ji: " + debug_table_ji[x] + "  vf: " + debug_table_vf[x] + "  vff: " + debug_table_vff[x] + "  if: " + debug_table_if[x] + "  vifff: " + debug_table_vifff[x] + "  iiiiiiiiii: " + debug_table_iiiiiiiiii[x] + "  viffff: " + debug_table_viffff[x] + "  vffff: " + debug_table_vffff[x] + "  i: " + debug_table_i[x] + "  X: " + debug_table_X[x] + "  j: " + debug_table_j[x] + "  "); abort(x) }

function nullFunc_viiiiiiiii(x) { err("Invalid function pointer '" + x + "' called with signature 'viiiiiiiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  err("This pointer might make sense in another type signature: viiii: " + debug_table_viiii[x] + "  viii: " + debug_table_viii[x] + "  viiiii: " + debug_table_viiiii[x] + "  vii: " + debug_table_vii[x] + "  viiiiii: " + debug_table_viiiiii[x] + "  viiiiiii: " + debug_table_viiiiiii[x] + "  viiiiiiii: " + debug_table_viiiiiiii[x] + "  vi: " + debug_table_vi[x] + "  viiiiiiiiii: " + debug_table_viiiiiiiiii[x] + "  viiiiiiiiiii: " + debug_table_viiiiiiiiiii[x] + "  v: " + debug_table_v[x] + "  iiiii: " + debug_table_iiiii[x] + "  iiii: " + debug_table_iiii[x] + "  iiiiii: " + debug_table_iiiiii[x] + "  iii: " + debug_table_iii[x] + "  iiiiiii: " + debug_table_iiiiiii[x] + "  iiiiiiii: " + debug_table_iiiiiiii[x] + "  viif: " + debug_table_viif[x] + "  iiiiif: " + debug_table_iiiiif[x] + "  vfi: " + debug_table_vfi[x] + "  vif: " + debug_table_vif[x] + "  iiiiiiiii: " + debug_table_iiiiiiiii[x] + "  ii: " + debug_table_ii[x] + "  iiiiidii: " + debug_table_iiiiidii[x] + "  jiji: " + debug_table_jiji[x] + "  viff: " + debug_table_viff[x] + "  vff: " + debug_table_vff[x] + "  ji: " + debug_table_ji[x] + "  vf: " + debug_table_vf[x] + "  iiiiiiiiii: " + debug_table_iiiiiiiiii[x] + "  vifff: " + debug_table_vifff[x] + "  if: " + debug_table_if[x] + "  viffff: " + debug_table_viffff[x] + "  vffff: " + debug_table_vffff[x] + "  i: " + debug_table_i[x] + "  X: " + debug_table_X[x] + "  j: " + debug_table_j[x] + "  "); abort(x) }

function nullFunc_viiiiiiiiii(x) { err("Invalid function pointer '" + x + "' called with signature 'viiiiiiiiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  err("This pointer might make sense in another type signature: viiii: " + debug_table_viiii[x] + "  viii: " + debug_table_viii[x] + "  viiiii: " + debug_table_viiiii[x] + "  vii: " + debug_table_vii[x] + "  viiiiii: " + debug_table_viiiiii[x] + "  viiiiiii: " + debug_table_viiiiiii[x] + "  viiiiiiii: " + debug_table_viiiiiiii[x] + "  vi: " + debug_table_vi[x] + "  viiiiiiiii: " + debug_table_viiiiiiiii[x] + "  viiiiiiiiiii: " + debug_table_viiiiiiiiiii[x] + "  v: " + debug_table_v[x] + "  iiiii: " + debug_table_iiiii[x] + "  iiii: " + debug_table_iiii[x] + "  iiiiii: " + debug_table_iiiiii[x] + "  iii: " + debug_table_iii[x] + "  iiiiiii: " + debug_table_iiiiiii[x] + "  iiiiiiii: " + debug_table_iiiiiiii[x] + "  viif: " + debug_table_viif[x] + "  iiiiif: " + debug_table_iiiiif[x] + "  vfi: " + debug_table_vfi[x] + "  vif: " + debug_table_vif[x] + "  iiiiiiiii: " + debug_table_iiiiiiiii[x] + "  iiiiidii: " + debug_table_iiiiidii[x] + "  ii: " + debug_table_ii[x] + "  jiji: " + debug_table_jiji[x] + "  viff: " + debug_table_viff[x] + "  iiiiiiiiii: " + debug_table_iiiiiiiiii[x] + "  vff: " + debug_table_vff[x] + "  vifff: " + debug_table_vifff[x] + "  ji: " + debug_table_ji[x] + "  vf: " + debug_table_vf[x] + "  if: " + debug_table_if[x] + "  viffff: " + debug_table_viffff[x] + "  vffff: " + debug_table_vffff[x] + "  i: " + debug_table_i[x] + "  X: " + debug_table_X[x] + "  j: " + debug_table_j[x] + "  "); abort(x) }

function nullFunc_viiiiiiiiiii(x) { err("Invalid function pointer '" + x + "' called with signature 'viiiiiiiiiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  err("This pointer might make sense in another type signature: viiii: " + debug_table_viiii[x] + "  viii: " + debug_table_viii[x] + "  viiiii: " + debug_table_viiiii[x] + "  vii: " + debug_table_vii[x] + "  viiiiii: " + debug_table_viiiiii[x] + "  viiiiiii: " + debug_table_viiiiiii[x] + "  viiiiiiii: " + debug_table_viiiiiiii[x] + "  vi: " + debug_table_vi[x] + "  viiiiiiiii: " + debug_table_viiiiiiiii[x] + "  viiiiiiiiii: " + debug_table_viiiiiiiiii[x] + "  v: " + debug_table_v[x] + "  iiiii: " + debug_table_iiiii[x] + "  iiii: " + debug_table_iiii[x] + "  iiiiii: " + debug_table_iiiiii[x] + "  iiiiiii: " + debug_table_iiiiiii[x] + "  iii: " + debug_table_iii[x] + "  viif: " + debug_table_viif[x] + "  iiiiiiii: " + debug_table_iiiiiiii[x] + "  iiiiif: " + debug_table_iiiiif[x] + "  vfi: " + debug_table_vfi[x] + "  vif: " + debug_table_vif[x] + "  iiiiiiiii: " + debug_table_iiiiiiiii[x] + "  iiiiidii: " + debug_table_iiiiidii[x] + "  jiji: " + debug_table_jiji[x] + "  viff: " + debug_table_viff[x] + "  ii: " + debug_table_ii[x] + "  iiiiiiiiii: " + debug_table_iiiiiiiiii[x] + "  vff: " + debug_table_vff[x] + "  vifff: " + debug_table_vifff[x] + "  ji: " + debug_table_ji[x] + "  vf: " + debug_table_vf[x] + "  if: " + debug_table_if[x] + "  viffff: " + debug_table_viffff[x] + "  vffff: " + debug_table_vffff[x] + "  i: " + debug_table_i[x] + "  X: " + debug_table_X[x] + "  j: " + debug_table_j[x] + "  "); abort(x) }


function dynCall_X(index) {
  index = index|0;
  
  return mftCall_X(index);
}


function dynCall_i(index) {
  index = index|0;
  
  return mftCall_i(index)|0;
}


function dynCall_if(index,a1) {
  index = index|0;
  a1=Math_fround(a1);
  return mftCall_if(index,Math_fround(a1))|0;
}


function dynCall_ii(index,a1) {
  index = index|0;
  a1=a1|0;
  return mftCall_ii(index,a1|0)|0;
}


function dynCall_iii(index,a1,a2) {
  index = index|0;
  a1=a1|0; a2=a2|0;
  return mftCall_iii(index,a1|0,a2|0)|0;
}


function dynCall_iiii(index,a1,a2,a3) {
  index = index|0;
  a1=a1|0; a2=a2|0; a3=a3|0;
  return mftCall_iiii(index,a1|0,a2|0,a3|0)|0;
}


function dynCall_iiiii(index,a1,a2,a3,a4) {
  index = index|0;
  a1=a1|0; a2=a2|0; a3=a3|0; a4=a4|0;
  return mftCall_iiiii(index,a1|0,a2|0,a3|0,a4|0)|0;
}


function dynCall_iiiiidii(index,a1,a2,a3,a4,a5,a6,a7) {
  index = index|0;
  a1=a1|0; a2=a2|0; a3=a3|0; a4=a4|0; a5=+a5; a6=a6|0; a7=a7|0;
  return mftCall_iiiiidii(index,a1|0,a2|0,a3|0,a4|0,+a5,a6|0,a7|0)|0;
}


function dynCall_iiiiif(index,a1,a2,a3,a4,a5) {
  index = index|0;
  a1=a1|0; a2=a2|0; a3=a3|0; a4=a4|0; a5=Math_fround(a5);
  return mftCall_iiiiif(index,a1|0,a2|0,a3|0,a4|0,Math_fround(a5))|0;
}


function dynCall_iiiiii(index,a1,a2,a3,a4,a5) {
  index = index|0;
  a1=a1|0; a2=a2|0; a3=a3|0; a4=a4|0; a5=a5|0;
  return mftCall_iiiiii(index,a1|0,a2|0,a3|0,a4|0,a5|0)|0;
}


function dynCall_iiiiiii(index,a1,a2,a3,a4,a5,a6) {
  index = index|0;
  a1=a1|0; a2=a2|0; a3=a3|0; a4=a4|0; a5=a5|0; a6=a6|0;
  return mftCall_iiiiiii(index,a1|0,a2|0,a3|0,a4|0,a5|0,a6|0)|0;
}


function dynCall_iiiiiiii(index,a1,a2,a3,a4,a5,a6,a7) {
  index = index|0;
  a1=a1|0; a2=a2|0; a3=a3|0; a4=a4|0; a5=a5|0; a6=a6|0; a7=a7|0;
  return mftCall_iiiiiiii(index,a1|0,a2|0,a3|0,a4|0,a5|0,a6|0,a7|0)|0;
}


function dynCall_iiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8) {
  index = index|0;
  a1=a1|0; a2=a2|0; a3=a3|0; a4=a4|0; a5=a5|0; a6=a6|0; a7=a7|0; a8=a8|0;
  return mftCall_iiiiiiiii(index,a1|0,a2|0,a3|0,a4|0,a5|0,a6|0,a7|0,a8|0)|0;
}


function dynCall_iiiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9) {
  index = index|0;
  a1=a1|0; a2=a2|0; a3=a3|0; a4=a4|0; a5=a5|0; a6=a6|0; a7=a7|0; a8=a8|0; a9=a9|0;
  return mftCall_iiiiiiiiii(index,a1|0,a2|0,a3|0,a4|0,a5|0,a6|0,a7|0,a8|0,a9|0)|0;
}


function dynCall_j(index) {
  index = index|0;
  
  return i64(mftCall_j(index));
}


function dynCall_ji(index,a1) {
  index = index|0;
  a1=a1|0;
  return i64(mftCall_ji(index,a1|0));
}


function dynCall_jiji(index,a1,a2,a3) {
  index = index|0;
  a1=a1|0; a2=i64(a2); a3=a3|0;
  return i64(mftCall_jiji(index,a1|0,i64(a2),a3|0));
}


function dynCall_v(index) {
  index = index|0;
  
  mftCall_v(index);
}


function dynCall_vf(index,a1) {
  index = index|0;
  a1=Math_fround(a1);
  mftCall_vf(index,Math_fround(a1));
}


function dynCall_vff(index,a1,a2) {
  index = index|0;
  a1=Math_fround(a1); a2=Math_fround(a2);
  mftCall_vff(index,Math_fround(a1),Math_fround(a2));
}


function dynCall_vffff(index,a1,a2,a3,a4) {
  index = index|0;
  a1=Math_fround(a1); a2=Math_fround(a2); a3=Math_fround(a3); a4=Math_fround(a4);
  mftCall_vffff(index,Math_fround(a1),Math_fround(a2),Math_fround(a3),Math_fround(a4));
}


function dynCall_vfi(index,a1,a2) {
  index = index|0;
  a1=Math_fround(a1); a2=a2|0;
  mftCall_vfi(index,Math_fround(a1),a2|0);
}


function dynCall_vi(index,a1) {
  index = index|0;
  a1=a1|0;
  mftCall_vi(index,a1|0);
}


function dynCall_vif(index,a1,a2) {
  index = index|0;
  a1=a1|0; a2=Math_fround(a2);
  mftCall_vif(index,a1|0,Math_fround(a2));
}


function dynCall_viff(index,a1,a2,a3) {
  index = index|0;
  a1=a1|0; a2=Math_fround(a2); a3=Math_fround(a3);
  mftCall_viff(index,a1|0,Math_fround(a2),Math_fround(a3));
}


function dynCall_vifff(index,a1,a2,a3,a4) {
  index = index|0;
  a1=a1|0; a2=Math_fround(a2); a3=Math_fround(a3); a4=Math_fround(a4);
  mftCall_vifff(index,a1|0,Math_fround(a2),Math_fround(a3),Math_fround(a4));
}


function dynCall_viffff(index,a1,a2,a3,a4,a5) {
  index = index|0;
  a1=a1|0; a2=Math_fround(a2); a3=Math_fround(a3); a4=Math_fround(a4); a5=Math_fround(a5);
  mftCall_viffff(index,a1|0,Math_fround(a2),Math_fround(a3),Math_fround(a4),Math_fround(a5));
}


function dynCall_vii(index,a1,a2) {
  index = index|0;
  a1=a1|0; a2=a2|0;
  mftCall_vii(index,a1|0,a2|0);
}


function dynCall_viif(index,a1,a2,a3) {
  index = index|0;
  a1=a1|0; a2=a2|0; a3=Math_fround(a3);
  mftCall_viif(index,a1|0,a2|0,Math_fround(a3));
}


function dynCall_viii(index,a1,a2,a3) {
  index = index|0;
  a1=a1|0; a2=a2|0; a3=a3|0;
  mftCall_viii(index,a1|0,a2|0,a3|0);
}


function dynCall_viiii(index,a1,a2,a3,a4) {
  index = index|0;
  a1=a1|0; a2=a2|0; a3=a3|0; a4=a4|0;
  mftCall_viiii(index,a1|0,a2|0,a3|0,a4|0);
}


function dynCall_viiiii(index,a1,a2,a3,a4,a5) {
  index = index|0;
  a1=a1|0; a2=a2|0; a3=a3|0; a4=a4|0; a5=a5|0;
  mftCall_viiiii(index,a1|0,a2|0,a3|0,a4|0,a5|0);
}


function dynCall_viiiiii(index,a1,a2,a3,a4,a5,a6) {
  index = index|0;
  a1=a1|0; a2=a2|0; a3=a3|0; a4=a4|0; a5=a5|0; a6=a6|0;
  mftCall_viiiiii(index,a1|0,a2|0,a3|0,a4|0,a5|0,a6|0);
}


function dynCall_viiiiiii(index,a1,a2,a3,a4,a5,a6,a7) {
  index = index|0;
  a1=a1|0; a2=a2|0; a3=a3|0; a4=a4|0; a5=a5|0; a6=a6|0; a7=a7|0;
  mftCall_viiiiiii(index,a1|0,a2|0,a3|0,a4|0,a5|0,a6|0,a7|0);
}


function dynCall_viiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8) {
  index = index|0;
  a1=a1|0; a2=a2|0; a3=a3|0; a4=a4|0; a5=a5|0; a6=a6|0; a7=a7|0; a8=a8|0;
  mftCall_viiiiiiii(index,a1|0,a2|0,a3|0,a4|0,a5|0,a6|0,a7|0,a8|0);
}


function dynCall_viiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9) {
  index = index|0;
  a1=a1|0; a2=a2|0; a3=a3|0; a4=a4|0; a5=a5|0; a6=a6|0; a7=a7|0; a8=a8|0; a9=a9|0;
  mftCall_viiiiiiiii(index,a1|0,a2|0,a3|0,a4|0,a5|0,a6|0,a7|0,a8|0,a9|0);
}


function dynCall_viiiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10) {
  index = index|0;
  a1=a1|0; a2=a2|0; a3=a3|0; a4=a4|0; a5=a5|0; a6=a6|0; a7=a7|0; a8=a8|0; a9=a9|0; a10=a10|0;
  mftCall_viiiiiiiiii(index,a1|0,a2|0,a3|0,a4|0,a5|0,a6|0,a7|0,a8|0,a9|0,a10|0);
}


function dynCall_viiiiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11) {
  index = index|0;
  a1=a1|0; a2=a2|0; a3=a3|0; a4=a4|0; a5=a5|0; a6=a6|0; a7=a7|0; a8=a8|0; a9=a9|0; a10=a10|0; a11=a11|0;
  mftCall_viiiiiiiiiii(index,a1|0,a2|0,a3|0,a4|0,a5|0,a6|0,a7|0,a8|0,a9|0,a10|0,a11|0);
}


var asmGlobalArg = {}

var asmLibraryArg = {
  "abort": abort,
  "setTempRet0": setTempRet0,
  "getTempRet0": getTempRet0,
  "abortStackOverflow": abortStackOverflow,
  "nullFunc_X": nullFunc_X,
  "nullFunc_i": nullFunc_i,
  "nullFunc_if": nullFunc_if,
  "nullFunc_ii": nullFunc_ii,
  "nullFunc_iii": nullFunc_iii,
  "nullFunc_iiii": nullFunc_iiii,
  "nullFunc_iiiii": nullFunc_iiiii,
  "nullFunc_iiiiidii": nullFunc_iiiiidii,
  "nullFunc_iiiiif": nullFunc_iiiiif,
  "nullFunc_iiiiii": nullFunc_iiiiii,
  "nullFunc_iiiiiii": nullFunc_iiiiiii,
  "nullFunc_iiiiiiii": nullFunc_iiiiiiii,
  "nullFunc_iiiiiiiii": nullFunc_iiiiiiiii,
  "nullFunc_iiiiiiiiii": nullFunc_iiiiiiiiii,
  "nullFunc_j": nullFunc_j,
  "nullFunc_ji": nullFunc_ji,
  "nullFunc_jiji": nullFunc_jiji,
  "nullFunc_v": nullFunc_v,
  "nullFunc_vf": nullFunc_vf,
  "nullFunc_vff": nullFunc_vff,
  "nullFunc_vffff": nullFunc_vffff,
  "nullFunc_vfi": nullFunc_vfi,
  "nullFunc_vi": nullFunc_vi,
  "nullFunc_vif": nullFunc_vif,
  "nullFunc_viff": nullFunc_viff,
  "nullFunc_vifff": nullFunc_vifff,
  "nullFunc_viffff": nullFunc_viffff,
  "nullFunc_vii": nullFunc_vii,
  "nullFunc_viif": nullFunc_viif,
  "nullFunc_viii": nullFunc_viii,
  "nullFunc_viiii": nullFunc_viiii,
  "nullFunc_viiiii": nullFunc_viiiii,
  "nullFunc_viiiiii": nullFunc_viiiiii,
  "nullFunc_viiiiiii": nullFunc_viiiiiii,
  "nullFunc_viiiiiiii": nullFunc_viiiiiiii,
  "nullFunc_viiiiiiiii": nullFunc_viiiiiiiii,
  "nullFunc_viiiiiiiiii": nullFunc_viiiiiiiiii,
  "nullFunc_viiiiiiiiiii": nullFunc_viiiiiiiiiii,
  "_JSEvents_requestFullscreen": _JSEvents_requestFullscreen,
  "_JSEvents_resizeCanvasForFullscreen": _JSEvents_resizeCanvasForFullscreen,
  "___buildEnvironment": ___buildEnvironment,
  "___lock": ___lock,
  "___setErrNo": ___setErrNo,
  "___syscall10": ___syscall10,
  "___syscall102": ___syscall102,
  "___syscall12": ___syscall12,
  "___syscall122": ___syscall122,
  "___syscall140": ___syscall140,
  "___syscall145": ___syscall145,
  "___syscall146": ___syscall146,
  "___syscall15": ___syscall15,
  "___syscall183": ___syscall183,
  "___syscall195": ___syscall195,
  "___syscall220": ___syscall220,
  "___syscall221": ___syscall221,
  "___syscall3": ___syscall3,
  "___syscall33": ___syscall33,
  "___syscall38": ___syscall38,
  "___syscall39": ___syscall39,
  "___syscall4": ___syscall4,
  "___syscall40": ___syscall40,
  "___syscall5": ___syscall5,
  "___syscall54": ___syscall54,
  "___syscall6": ___syscall6,
  "___unlock": ___unlock,
  "__computeUnpackAlignedImageSize": __computeUnpackAlignedImageSize,
  "__emscripten_do_request_fullscreen": __emscripten_do_request_fullscreen,
  "__fillFullscreenChangeEventData": __fillFullscreenChangeEventData,
  "__fillGamepadEventData": __fillGamepadEventData,
  "__fillMouseEventData": __fillMouseEventData,
  "__fillPointerlockChangeEventData": __fillPointerlockChangeEventData,
  "__fillVisibilityChangeEventData": __fillVisibilityChangeEventData,
  "__findCanvasEventTarget": __findCanvasEventTarget,
  "__findEventTarget": __findEventTarget,
  "__get_canvas_element_size": __get_canvas_element_size,
  "__glGenObject": __glGenObject,
  "__inet_ntop4_raw": __inet_ntop4_raw,
  "__inet_ntop6_raw": __inet_ntop6_raw,
  "__inet_pton4_raw": __inet_pton4_raw,
  "__inet_pton6_raw": __inet_pton6_raw,
  "__read_sockaddr": __read_sockaddr,
  "__registerFocusEventCallback": __registerFocusEventCallback,
  "__registerFullscreenChangeEventCallback": __registerFullscreenChangeEventCallback,
  "__registerGamepadEventCallback": __registerGamepadEventCallback,
  "__registerKeyEventCallback": __registerKeyEventCallback,
  "__registerMouseEventCallback": __registerMouseEventCallback,
  "__registerPointerlockChangeEventCallback": __registerPointerlockChangeEventCallback,
  "__registerRestoreOldStyle": __registerRestoreOldStyle,
  "__registerTouchEventCallback": __registerTouchEventCallback,
  "__registerUiEventCallback": __registerUiEventCallback,
  "__registerVisibilityChangeEventCallback": __registerVisibilityChangeEventCallback,
  "__registerWheelEventCallback": __registerWheelEventCallback,
  "__requestPointerLock": __requestPointerLock,
  "__setLetterbox": __setLetterbox,
  "__set_canvas_element_size": __set_canvas_element_size,
  "__write_sockaddr": __write_sockaddr,
  "_abort": _abort,
  "_alBufferData": _alBufferData,
  "_alGenBuffers": _alGenBuffers,
  "_alGenSources": _alGenSources,
  "_alGetError": _alGetError,
  "_alGetSourcei": _alGetSourcei,
  "_alListener3f": _alListener3f,
  "_alListenerf": _alListenerf,
  "_alSourcePlay": _alSourcePlay,
  "_alSourceQueueBuffers": _alSourceQueueBuffers,
  "_alSourceStop": _alSourceStop,
  "_alSourceUnqueueBuffers": _alSourceUnqueueBuffers,
  "_alSourcef": _alSourcef,
  "_alSourcefv": _alSourcefv,
  "_alcCreateContext": _alcCreateContext,
  "_alcMakeContextCurrent": _alcMakeContextCurrent,
  "_alcOpenDevice": _alcOpenDevice,
  "_asctime": _asctime,
  "_asctime_r": _asctime_r,
  "_atexit": _atexit,
  "_clock": _clock,
  "_clock_gettime": _clock_gettime,
  "_dlclose": _dlclose,
  "_dlerror": _dlerror,
  "_dlopen": _dlopen,
  "_dlsym": _dlsym,
  "_eglBindAPI": _eglBindAPI,
  "_eglChooseConfig": _eglChooseConfig,
  "_eglCreateContext": _eglCreateContext,
  "_eglCreateWindowSurface": _eglCreateWindowSurface,
  "_eglDestroyContext": _eglDestroyContext,
  "_eglDestroySurface": _eglDestroySurface,
  "_eglGetConfigAttrib": _eglGetConfigAttrib,
  "_eglGetDisplay": _eglGetDisplay,
  "_eglGetError": _eglGetError,
  "_eglGetProcAddress": _eglGetProcAddress,
  "_eglInitialize": _eglInitialize,
  "_eglMakeCurrent": _eglMakeCurrent,
  "_eglQueryString": _eglQueryString,
  "_eglSwapBuffers": _eglSwapBuffers,
  "_eglSwapInterval": _eglSwapInterval,
  "_eglTerminate": _eglTerminate,
  "_eglWaitClient": _eglWaitClient,
  "_eglWaitGL": _eglWaitGL,
  "_eglWaitNative": _eglWaitNative,
  "_emscripten_asm_const_i": _emscripten_asm_const_i,
  "_emscripten_asm_const_ii": _emscripten_asm_const_ii,
  "_emscripten_asm_const_iii": _emscripten_asm_const_iii,
  "_emscripten_asm_const_iiii": _emscripten_asm_const_iiii,
  "_emscripten_asm_const_iiiii": _emscripten_asm_const_iiiii,
  "_emscripten_asm_const_iiiiii": _emscripten_asm_const_iiiiii,
  "_emscripten_cancel_main_loop": _emscripten_cancel_main_loop,
  "_emscripten_exit_fullscreen": _emscripten_exit_fullscreen,
  "_emscripten_exit_pointerlock": _emscripten_exit_pointerlock,
  "_emscripten_get_canvas_element_size": _emscripten_get_canvas_element_size,
  "_emscripten_get_device_pixel_ratio": _emscripten_get_device_pixel_ratio,
  "_emscripten_get_element_css_size": _emscripten_get_element_css_size,
  "_emscripten_get_gamepad_status": _emscripten_get_gamepad_status,
  "_emscripten_get_heap_size": _emscripten_get_heap_size,
  "_emscripten_get_now": _emscripten_get_now,
  "_emscripten_get_now_is_monotonic": _emscripten_get_now_is_monotonic,
  "_emscripten_get_num_gamepads": _emscripten_get_num_gamepads,
  "_emscripten_glActiveTexture": _emscripten_glActiveTexture,
  "_emscripten_glAttachShader": _emscripten_glAttachShader,
  "_emscripten_glBeginQueryEXT": _emscripten_glBeginQueryEXT,
  "_emscripten_glBindAttribLocation": _emscripten_glBindAttribLocation,
  "_emscripten_glBindBuffer": _emscripten_glBindBuffer,
  "_emscripten_glBindFramebuffer": _emscripten_glBindFramebuffer,
  "_emscripten_glBindRenderbuffer": _emscripten_glBindRenderbuffer,
  "_emscripten_glBindTexture": _emscripten_glBindTexture,
  "_emscripten_glBindVertexArrayOES": _emscripten_glBindVertexArrayOES,
  "_emscripten_glBlendColor": _emscripten_glBlendColor,
  "_emscripten_glBlendEquation": _emscripten_glBlendEquation,
  "_emscripten_glBlendEquationSeparate": _emscripten_glBlendEquationSeparate,
  "_emscripten_glBlendFunc": _emscripten_glBlendFunc,
  "_emscripten_glBlendFuncSeparate": _emscripten_glBlendFuncSeparate,
  "_emscripten_glBufferData": _emscripten_glBufferData,
  "_emscripten_glBufferSubData": _emscripten_glBufferSubData,
  "_emscripten_glCheckFramebufferStatus": _emscripten_glCheckFramebufferStatus,
  "_emscripten_glClear": _emscripten_glClear,
  "_emscripten_glClearColor": _emscripten_glClearColor,
  "_emscripten_glClearDepthf": _emscripten_glClearDepthf,
  "_emscripten_glClearStencil": _emscripten_glClearStencil,
  "_emscripten_glColorMask": _emscripten_glColorMask,
  "_emscripten_glCompileShader": _emscripten_glCompileShader,
  "_emscripten_glCompressedTexImage2D": _emscripten_glCompressedTexImage2D,
  "_emscripten_glCompressedTexSubImage2D": _emscripten_glCompressedTexSubImage2D,
  "_emscripten_glCopyTexImage2D": _emscripten_glCopyTexImage2D,
  "_emscripten_glCopyTexSubImage2D": _emscripten_glCopyTexSubImage2D,
  "_emscripten_glCreateProgram": _emscripten_glCreateProgram,
  "_emscripten_glCreateShader": _emscripten_glCreateShader,
  "_emscripten_glCullFace": _emscripten_glCullFace,
  "_emscripten_glDeleteBuffers": _emscripten_glDeleteBuffers,
  "_emscripten_glDeleteFramebuffers": _emscripten_glDeleteFramebuffers,
  "_emscripten_glDeleteProgram": _emscripten_glDeleteProgram,
  "_emscripten_glDeleteQueriesEXT": _emscripten_glDeleteQueriesEXT,
  "_emscripten_glDeleteRenderbuffers": _emscripten_glDeleteRenderbuffers,
  "_emscripten_glDeleteShader": _emscripten_glDeleteShader,
  "_emscripten_glDeleteTextures": _emscripten_glDeleteTextures,
  "_emscripten_glDeleteVertexArraysOES": _emscripten_glDeleteVertexArraysOES,
  "_emscripten_glDepthFunc": _emscripten_glDepthFunc,
  "_emscripten_glDepthMask": _emscripten_glDepthMask,
  "_emscripten_glDepthRangef": _emscripten_glDepthRangef,
  "_emscripten_glDetachShader": _emscripten_glDetachShader,
  "_emscripten_glDisable": _emscripten_glDisable,
  "_emscripten_glDisableVertexAttribArray": _emscripten_glDisableVertexAttribArray,
  "_emscripten_glDrawArrays": _emscripten_glDrawArrays,
  "_emscripten_glDrawArraysInstancedANGLE": _emscripten_glDrawArraysInstancedANGLE,
  "_emscripten_glDrawBuffersWEBGL": _emscripten_glDrawBuffersWEBGL,
  "_emscripten_glDrawElements": _emscripten_glDrawElements,
  "_emscripten_glDrawElementsInstancedANGLE": _emscripten_glDrawElementsInstancedANGLE,
  "_emscripten_glEnable": _emscripten_glEnable,
  "_emscripten_glEnableVertexAttribArray": _emscripten_glEnableVertexAttribArray,
  "_emscripten_glEndQueryEXT": _emscripten_glEndQueryEXT,
  "_emscripten_glFinish": _emscripten_glFinish,
  "_emscripten_glFlush": _emscripten_glFlush,
  "_emscripten_glFramebufferRenderbuffer": _emscripten_glFramebufferRenderbuffer,
  "_emscripten_glFramebufferTexture2D": _emscripten_glFramebufferTexture2D,
  "_emscripten_glFrontFace": _emscripten_glFrontFace,
  "_emscripten_glGenBuffers": _emscripten_glGenBuffers,
  "_emscripten_glGenFramebuffers": _emscripten_glGenFramebuffers,
  "_emscripten_glGenQueriesEXT": _emscripten_glGenQueriesEXT,
  "_emscripten_glGenRenderbuffers": _emscripten_glGenRenderbuffers,
  "_emscripten_glGenTextures": _emscripten_glGenTextures,
  "_emscripten_glGenVertexArraysOES": _emscripten_glGenVertexArraysOES,
  "_emscripten_glGenerateMipmap": _emscripten_glGenerateMipmap,
  "_emscripten_glGetActiveAttrib": _emscripten_glGetActiveAttrib,
  "_emscripten_glGetActiveUniform": _emscripten_glGetActiveUniform,
  "_emscripten_glGetAttachedShaders": _emscripten_glGetAttachedShaders,
  "_emscripten_glGetAttribLocation": _emscripten_glGetAttribLocation,
  "_emscripten_glGetBooleanv": _emscripten_glGetBooleanv,
  "_emscripten_glGetBufferParameteriv": _emscripten_glGetBufferParameteriv,
  "_emscripten_glGetError": _emscripten_glGetError,
  "_emscripten_glGetFloatv": _emscripten_glGetFloatv,
  "_emscripten_glGetFramebufferAttachmentParameteriv": _emscripten_glGetFramebufferAttachmentParameteriv,
  "_emscripten_glGetIntegerv": _emscripten_glGetIntegerv,
  "_emscripten_glGetProgramInfoLog": _emscripten_glGetProgramInfoLog,
  "_emscripten_glGetProgramiv": _emscripten_glGetProgramiv,
  "_emscripten_glGetQueryObjecti64vEXT": _emscripten_glGetQueryObjecti64vEXT,
  "_emscripten_glGetQueryObjectivEXT": _emscripten_glGetQueryObjectivEXT,
  "_emscripten_glGetQueryObjectui64vEXT": _emscripten_glGetQueryObjectui64vEXT,
  "_emscripten_glGetQueryObjectuivEXT": _emscripten_glGetQueryObjectuivEXT,
  "_emscripten_glGetQueryivEXT": _emscripten_glGetQueryivEXT,
  "_emscripten_glGetRenderbufferParameteriv": _emscripten_glGetRenderbufferParameteriv,
  "_emscripten_glGetShaderInfoLog": _emscripten_glGetShaderInfoLog,
  "_emscripten_glGetShaderPrecisionFormat": _emscripten_glGetShaderPrecisionFormat,
  "_emscripten_glGetShaderSource": _emscripten_glGetShaderSource,
  "_emscripten_glGetShaderiv": _emscripten_glGetShaderiv,
  "_emscripten_glGetString": _emscripten_glGetString,
  "_emscripten_glGetTexParameterfv": _emscripten_glGetTexParameterfv,
  "_emscripten_glGetTexParameteriv": _emscripten_glGetTexParameteriv,
  "_emscripten_glGetUniformLocation": _emscripten_glGetUniformLocation,
  "_emscripten_glGetUniformfv": _emscripten_glGetUniformfv,
  "_emscripten_glGetUniformiv": _emscripten_glGetUniformiv,
  "_emscripten_glGetVertexAttribPointerv": _emscripten_glGetVertexAttribPointerv,
  "_emscripten_glGetVertexAttribfv": _emscripten_glGetVertexAttribfv,
  "_emscripten_glGetVertexAttribiv": _emscripten_glGetVertexAttribiv,
  "_emscripten_glHint": _emscripten_glHint,
  "_emscripten_glIsBuffer": _emscripten_glIsBuffer,
  "_emscripten_glIsEnabled": _emscripten_glIsEnabled,
  "_emscripten_glIsFramebuffer": _emscripten_glIsFramebuffer,
  "_emscripten_glIsProgram": _emscripten_glIsProgram,
  "_emscripten_glIsQueryEXT": _emscripten_glIsQueryEXT,
  "_emscripten_glIsRenderbuffer": _emscripten_glIsRenderbuffer,
  "_emscripten_glIsShader": _emscripten_glIsShader,
  "_emscripten_glIsTexture": _emscripten_glIsTexture,
  "_emscripten_glIsVertexArrayOES": _emscripten_glIsVertexArrayOES,
  "_emscripten_glLineWidth": _emscripten_glLineWidth,
  "_emscripten_glLinkProgram": _emscripten_glLinkProgram,
  "_emscripten_glPixelStorei": _emscripten_glPixelStorei,
  "_emscripten_glPolygonOffset": _emscripten_glPolygonOffset,
  "_emscripten_glQueryCounterEXT": _emscripten_glQueryCounterEXT,
  "_emscripten_glReadPixels": _emscripten_glReadPixels,
  "_emscripten_glReleaseShaderCompiler": _emscripten_glReleaseShaderCompiler,
  "_emscripten_glRenderbufferStorage": _emscripten_glRenderbufferStorage,
  "_emscripten_glSampleCoverage": _emscripten_glSampleCoverage,
  "_emscripten_glScissor": _emscripten_glScissor,
  "_emscripten_glShaderBinary": _emscripten_glShaderBinary,
  "_emscripten_glShaderSource": _emscripten_glShaderSource,
  "_emscripten_glStencilFunc": _emscripten_glStencilFunc,
  "_emscripten_glStencilFuncSeparate": _emscripten_glStencilFuncSeparate,
  "_emscripten_glStencilMask": _emscripten_glStencilMask,
  "_emscripten_glStencilMaskSeparate": _emscripten_glStencilMaskSeparate,
  "_emscripten_glStencilOp": _emscripten_glStencilOp,
  "_emscripten_glStencilOpSeparate": _emscripten_glStencilOpSeparate,
  "_emscripten_glTexImage2D": _emscripten_glTexImage2D,
  "_emscripten_glTexParameterf": _emscripten_glTexParameterf,
  "_emscripten_glTexParameterfv": _emscripten_glTexParameterfv,
  "_emscripten_glTexParameteri": _emscripten_glTexParameteri,
  "_emscripten_glTexParameteriv": _emscripten_glTexParameteriv,
  "_emscripten_glTexSubImage2D": _emscripten_glTexSubImage2D,
  "_emscripten_glUniform1f": _emscripten_glUniform1f,
  "_emscripten_glUniform1fv": _emscripten_glUniform1fv,
  "_emscripten_glUniform1i": _emscripten_glUniform1i,
  "_emscripten_glUniform1iv": _emscripten_glUniform1iv,
  "_emscripten_glUniform2f": _emscripten_glUniform2f,
  "_emscripten_glUniform2fv": _emscripten_glUniform2fv,
  "_emscripten_glUniform2i": _emscripten_glUniform2i,
  "_emscripten_glUniform2iv": _emscripten_glUniform2iv,
  "_emscripten_glUniform3f": _emscripten_glUniform3f,
  "_emscripten_glUniform3fv": _emscripten_glUniform3fv,
  "_emscripten_glUniform3i": _emscripten_glUniform3i,
  "_emscripten_glUniform3iv": _emscripten_glUniform3iv,
  "_emscripten_glUniform4f": _emscripten_glUniform4f,
  "_emscripten_glUniform4fv": _emscripten_glUniform4fv,
  "_emscripten_glUniform4i": _emscripten_glUniform4i,
  "_emscripten_glUniform4iv": _emscripten_glUniform4iv,
  "_emscripten_glUniformMatrix2fv": _emscripten_glUniformMatrix2fv,
  "_emscripten_glUniformMatrix3fv": _emscripten_glUniformMatrix3fv,
  "_emscripten_glUniformMatrix4fv": _emscripten_glUniformMatrix4fv,
  "_emscripten_glUseProgram": _emscripten_glUseProgram,
  "_emscripten_glValidateProgram": _emscripten_glValidateProgram,
  "_emscripten_glVertexAttrib1f": _emscripten_glVertexAttrib1f,
  "_emscripten_glVertexAttrib1fv": _emscripten_glVertexAttrib1fv,
  "_emscripten_glVertexAttrib2f": _emscripten_glVertexAttrib2f,
  "_emscripten_glVertexAttrib2fv": _emscripten_glVertexAttrib2fv,
  "_emscripten_glVertexAttrib3f": _emscripten_glVertexAttrib3f,
  "_emscripten_glVertexAttrib3fv": _emscripten_glVertexAttrib3fv,
  "_emscripten_glVertexAttrib4f": _emscripten_glVertexAttrib4f,
  "_emscripten_glVertexAttrib4fv": _emscripten_glVertexAttrib4fv,
  "_emscripten_glVertexAttribDivisorANGLE": _emscripten_glVertexAttribDivisorANGLE,
  "_emscripten_glVertexAttribPointer": _emscripten_glVertexAttribPointer,
  "_emscripten_glViewport": _emscripten_glViewport,
  "_emscripten_memcpy_big": _emscripten_memcpy_big,
  "_emscripten_request_fullscreen_strategy": _emscripten_request_fullscreen_strategy,
  "_emscripten_request_pointerlock": _emscripten_request_pointerlock,
  "_emscripten_resize_heap": _emscripten_resize_heap,
  "_emscripten_sample_gamepad_data": _emscripten_sample_gamepad_data,
  "_emscripten_set_blur_callback_on_thread": _emscripten_set_blur_callback_on_thread,
  "_emscripten_set_canvas_element_size": _emscripten_set_canvas_element_size,
  "_emscripten_set_element_css_size": _emscripten_set_element_css_size,
  "_emscripten_set_focus_callback_on_thread": _emscripten_set_focus_callback_on_thread,
  "_emscripten_set_fullscreenchange_callback_on_thread": _emscripten_set_fullscreenchange_callback_on_thread,
  "_emscripten_set_gamepadconnected_callback_on_thread": _emscripten_set_gamepadconnected_callback_on_thread,
  "_emscripten_set_gamepaddisconnected_callback_on_thread": _emscripten_set_gamepaddisconnected_callback_on_thread,
  "_emscripten_set_interval": _emscripten_set_interval,
  "_emscripten_set_keydown_callback_on_thread": _emscripten_set_keydown_callback_on_thread,
  "_emscripten_set_keypress_callback_on_thread": _emscripten_set_keypress_callback_on_thread,
  "_emscripten_set_keyup_callback_on_thread": _emscripten_set_keyup_callback_on_thread,
  "_emscripten_set_main_loop": _emscripten_set_main_loop,
  "_emscripten_set_main_loop_timing": _emscripten_set_main_loop_timing,
  "_emscripten_set_mousedown_callback_on_thread": _emscripten_set_mousedown_callback_on_thread,
  "_emscripten_set_mouseenter_callback_on_thread": _emscripten_set_mouseenter_callback_on_thread,
  "_emscripten_set_mouseleave_callback_on_thread": _emscripten_set_mouseleave_callback_on_thread,
  "_emscripten_set_mousemove_callback_on_thread": _emscripten_set_mousemove_callback_on_thread,
  "_emscripten_set_mouseup_callback_on_thread": _emscripten_set_mouseup_callback_on_thread,
  "_emscripten_set_pointerlockchange_callback_on_thread": _emscripten_set_pointerlockchange_callback_on_thread,
  "_emscripten_set_resize_callback_on_thread": _emscripten_set_resize_callback_on_thread,
  "_emscripten_set_timeout": _emscripten_set_timeout,
  "_emscripten_set_touchcancel_callback_on_thread": _emscripten_set_touchcancel_callback_on_thread,
  "_emscripten_set_touchend_callback_on_thread": _emscripten_set_touchend_callback_on_thread,
  "_emscripten_set_touchmove_callback_on_thread": _emscripten_set_touchmove_callback_on_thread,
  "_emscripten_set_touchstart_callback_on_thread": _emscripten_set_touchstart_callback_on_thread,
  "_emscripten_set_visibilitychange_callback_on_thread": _emscripten_set_visibilitychange_callback_on_thread,
  "_emscripten_set_wheel_callback_on_thread": _emscripten_set_wheel_callback_on_thread,
  "_exit": _exit,
  "_getenv": _getenv,
  "_gethostbyname": _gethostbyname,
  "_gettimeofday": _gettimeofday,
  "_glActiveTexture": _glActiveTexture,
  "_glAttachShader": _glAttachShader,
  "_glBindBuffer": _glBindBuffer,
  "_glBindFramebuffer": _glBindFramebuffer,
  "_glBindTexture": _glBindTexture,
  "_glBufferData": _glBufferData,
  "_glClear": _glClear,
  "_glCompileShader": _glCompileShader,
  "_glCreateProgram": _glCreateProgram,
  "_glCreateShader": _glCreateShader,
  "_glDrawArrays": _glDrawArrays,
  "_glEnableVertexAttribArray": _glEnableVertexAttribArray,
  "_glGenBuffers": _glGenBuffers,
  "_glGenTextures": _glGenTextures,
  "_glGetAttribLocation": _glGetAttribLocation,
  "_glGetProgramiv": _glGetProgramiv,
  "_glGetShaderInfoLog": _glGetShaderInfoLog,
  "_glGetShaderiv": _glGetShaderiv,
  "_glGetUniformLocation": _glGetUniformLocation,
  "_glLinkProgram": _glLinkProgram,
  "_glShaderSource": _glShaderSource,
  "_glTexImage2D": _glTexImage2D,
  "_glTexParameteri": _glTexParameteri,
  "_glTexSubImage2D": _glTexSubImage2D,
  "_glUniform1f": _glUniform1f,
  "_glUniform1i": _glUniform1i,
  "_glUniformMatrix2fv": _glUniformMatrix2fv,
  "_glUseProgram": _glUseProgram,
  "_glVertexAttribPointer": _glVertexAttribPointer,
  "_glViewport": _glViewport,
  "_inet_addr": _inet_addr,
  "_llvm_log10_f32": _llvm_log10_f32,
  "_llvm_stackrestore": _llvm_stackrestore,
  "_llvm_stacksave": _llvm_stacksave,
  "_llvm_trap": _llvm_trap,
  "_localtime": _localtime,
  "_localtime_r": _localtime_r,
  "_mktime": _mktime,
  "_nanosleep": _nanosleep,
  "_pthread_join": _pthread_join,
  "_pthread_mutexattr_destroy": _pthread_mutexattr_destroy,
  "_pthread_mutexattr_init": _pthread_mutexattr_init,
  "_pthread_mutexattr_settype": _pthread_mutexattr_settype,
  "_sigaction": _sigaction,
  "_signal": _signal,
  "_time": _time,
  "_tzset": _tzset,
  "_usleep": _usleep,
  "abortOnCannotGrowMemory": abortOnCannotGrowMemory,
  "emscriptenWebGLGet": emscriptenWebGLGet,
  "emscriptenWebGLGetTexPixelData": emscriptenWebGLGetTexPixelData,
  "emscriptenWebGLGetUniform": emscriptenWebGLGetUniform,
  "emscriptenWebGLGetVertexAttrib": emscriptenWebGLGetVertexAttrib,
  "stringToNewUTF8": stringToNewUTF8,
  "tempDoublePtr": tempDoublePtr,
  "DYNAMICTOP_PTR": DYNAMICTOP_PTR
}
// EMSCRIPTEN_START_ASM
var asm =Module["asm"]// EMSCRIPTEN_END_ASM
(asmGlobalArg, asmLibraryArg, buffer);

var real____emscripten_environ_constructor = asm["___emscripten_environ_constructor"]; asm["___emscripten_environ_constructor"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real____emscripten_environ_constructor.apply(null, arguments);
};

var real____errno_location = asm["___errno_location"]; asm["___errno_location"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real____errno_location.apply(null, arguments);
};

var real___get_daylight = asm["__get_daylight"]; asm["__get_daylight"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real___get_daylight.apply(null, arguments);
};

var real___get_environ = asm["__get_environ"]; asm["__get_environ"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real___get_environ.apply(null, arguments);
};

var real___get_timezone = asm["__get_timezone"]; asm["__get_timezone"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real___get_timezone.apply(null, arguments);
};

var real___get_tzname = asm["__get_tzname"]; asm["__get_tzname"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real___get_tzname.apply(null, arguments);
};

var real__emscripten_GetProcAddress = asm["_emscripten_GetProcAddress"]; asm["_emscripten_GetProcAddress"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real__emscripten_GetProcAddress.apply(null, arguments);
};

var real__fflush = asm["_fflush"]; asm["_fflush"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real__fflush.apply(null, arguments);
};

var real__free = asm["_free"]; asm["_free"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real__free.apply(null, arguments);
};

var real__htons = asm["_htons"]; asm["_htons"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real__htons.apply(null, arguments);
};

var real__llvm_bswap_i16 = asm["_llvm_bswap_i16"]; asm["_llvm_bswap_i16"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real__llvm_bswap_i16.apply(null, arguments);
};

var real__llvm_bswap_i32 = asm["_llvm_bswap_i32"]; asm["_llvm_bswap_i32"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real__llvm_bswap_i32.apply(null, arguments);
};

var real__main = asm["_main"]; asm["_main"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real__main.apply(null, arguments);
};

var real__malloc = asm["_malloc"]; asm["_malloc"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real__malloc.apply(null, arguments);
};

var real__memmove = asm["_memmove"]; asm["_memmove"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real__memmove.apply(null, arguments);
};

var real__sbrk = asm["_sbrk"]; asm["_sbrk"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real__sbrk.apply(null, arguments);
};

var real__strstr = asm["_strstr"]; asm["_strstr"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real__strstr.apply(null, arguments);
};

var real_establishStackSpace = asm["establishStackSpace"]; asm["establishStackSpace"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real_establishStackSpace.apply(null, arguments);
};

var real_stackAlloc = asm["stackAlloc"]; asm["stackAlloc"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real_stackAlloc.apply(null, arguments);
};

var real_stackRestore = asm["stackRestore"]; asm["stackRestore"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real_stackRestore.apply(null, arguments);
};

var real_stackSave = asm["stackSave"]; asm["stackSave"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real_stackSave.apply(null, arguments);
};
Module["asm"] = asm;
var ___emscripten_environ_constructor = Module["___emscripten_environ_constructor"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["___emscripten_environ_constructor"].apply(null, arguments) };
var ___errno_location = Module["___errno_location"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["___errno_location"].apply(null, arguments) };
var __get_daylight = Module["__get_daylight"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["__get_daylight"].apply(null, arguments) };
var __get_environ = Module["__get_environ"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["__get_environ"].apply(null, arguments) };
var __get_timezone = Module["__get_timezone"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["__get_timezone"].apply(null, arguments) };
var __get_tzname = Module["__get_tzname"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["__get_tzname"].apply(null, arguments) };
var _emscripten_GetProcAddress = Module["_emscripten_GetProcAddress"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["_emscripten_GetProcAddress"].apply(null, arguments) };
var _fflush = Module["_fflush"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["_fflush"].apply(null, arguments) };
var _free = Module["_free"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["_free"].apply(null, arguments) };
var _htons = Module["_htons"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["_htons"].apply(null, arguments) };
var _llvm_bswap_i16 = Module["_llvm_bswap_i16"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["_llvm_bswap_i16"].apply(null, arguments) };
var _llvm_bswap_i32 = Module["_llvm_bswap_i32"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["_llvm_bswap_i32"].apply(null, arguments) };
var _main = Module["_main"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["_main"].apply(null, arguments) };
var _malloc = Module["_malloc"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["_malloc"].apply(null, arguments) };
var _memcpy = Module["_memcpy"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["_memcpy"].apply(null, arguments) };
var _memmove = Module["_memmove"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["_memmove"].apply(null, arguments) };
var _memset = Module["_memset"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["_memset"].apply(null, arguments) };
var _sbrk = Module["_sbrk"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["_sbrk"].apply(null, arguments) };
var _strstr = Module["_strstr"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["_strstr"].apply(null, arguments) };
var establishStackSpace = Module["establishStackSpace"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["establishStackSpace"].apply(null, arguments) };
var stackAlloc = Module["stackAlloc"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["stackAlloc"].apply(null, arguments) };
var stackRestore = Module["stackRestore"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["stackRestore"].apply(null, arguments) };
var stackSave = Module["stackSave"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["stackSave"].apply(null, arguments) };
var dynCall_X = Module["dynCall_X"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["dynCall_X"].apply(null, arguments) };
var dynCall_i = Module["dynCall_i"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["dynCall_i"].apply(null, arguments) };
var dynCall_if = Module["dynCall_if"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["dynCall_if"].apply(null, arguments) };
var dynCall_ii = Module["dynCall_ii"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["dynCall_ii"].apply(null, arguments) };
var dynCall_iii = Module["dynCall_iii"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["dynCall_iii"].apply(null, arguments) };
var dynCall_iiii = Module["dynCall_iiii"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["dynCall_iiii"].apply(null, arguments) };
var dynCall_iiiii = Module["dynCall_iiiii"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["dynCall_iiiii"].apply(null, arguments) };
var dynCall_iiiiidii = Module["dynCall_iiiiidii"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["dynCall_iiiiidii"].apply(null, arguments) };
var dynCall_iiiiif = Module["dynCall_iiiiif"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["dynCall_iiiiif"].apply(null, arguments) };
var dynCall_iiiiii = Module["dynCall_iiiiii"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["dynCall_iiiiii"].apply(null, arguments) };
var dynCall_iiiiiii = Module["dynCall_iiiiiii"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["dynCall_iiiiiii"].apply(null, arguments) };
var dynCall_iiiiiiii = Module["dynCall_iiiiiiii"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["dynCall_iiiiiiii"].apply(null, arguments) };
var dynCall_iiiiiiiii = Module["dynCall_iiiiiiiii"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["dynCall_iiiiiiiii"].apply(null, arguments) };
var dynCall_iiiiiiiiii = Module["dynCall_iiiiiiiiii"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["dynCall_iiiiiiiiii"].apply(null, arguments) };
var dynCall_j = Module["dynCall_j"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["dynCall_j"].apply(null, arguments) };
var dynCall_ji = Module["dynCall_ji"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["dynCall_ji"].apply(null, arguments) };
var dynCall_jiji = Module["dynCall_jiji"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["dynCall_jiji"].apply(null, arguments) };
var dynCall_v = Module["dynCall_v"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["dynCall_v"].apply(null, arguments) };
var dynCall_vf = Module["dynCall_vf"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["dynCall_vf"].apply(null, arguments) };
var dynCall_vff = Module["dynCall_vff"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["dynCall_vff"].apply(null, arguments) };
var dynCall_vffff = Module["dynCall_vffff"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["dynCall_vffff"].apply(null, arguments) };
var dynCall_vfi = Module["dynCall_vfi"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["dynCall_vfi"].apply(null, arguments) };
var dynCall_vi = Module["dynCall_vi"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["dynCall_vi"].apply(null, arguments) };
var dynCall_vif = Module["dynCall_vif"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["dynCall_vif"].apply(null, arguments) };
var dynCall_viff = Module["dynCall_viff"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["dynCall_viff"].apply(null, arguments) };
var dynCall_vifff = Module["dynCall_vifff"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["dynCall_vifff"].apply(null, arguments) };
var dynCall_viffff = Module["dynCall_viffff"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["dynCall_viffff"].apply(null, arguments) };
var dynCall_vii = Module["dynCall_vii"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["dynCall_vii"].apply(null, arguments) };
var dynCall_viif = Module["dynCall_viif"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["dynCall_viif"].apply(null, arguments) };
var dynCall_viii = Module["dynCall_viii"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["dynCall_viii"].apply(null, arguments) };
var dynCall_viiii = Module["dynCall_viiii"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["dynCall_viiii"].apply(null, arguments) };
var dynCall_viiiii = Module["dynCall_viiiii"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["dynCall_viiiii"].apply(null, arguments) };
var dynCall_viiiiii = Module["dynCall_viiiiii"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["dynCall_viiiiii"].apply(null, arguments) };
var dynCall_viiiiiii = Module["dynCall_viiiiiii"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["dynCall_viiiiiii"].apply(null, arguments) };
var dynCall_viiiiiiii = Module["dynCall_viiiiiiii"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["dynCall_viiiiiiii"].apply(null, arguments) };
var dynCall_viiiiiiiii = Module["dynCall_viiiiiiiii"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["dynCall_viiiiiiiii"].apply(null, arguments) };
var dynCall_viiiiiiiiii = Module["dynCall_viiiiiiiiii"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["dynCall_viiiiiiiiii"].apply(null, arguments) };
var dynCall_viiiiiiiiiii = Module["dynCall_viiiiiiiiiii"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["dynCall_viiiiiiiiiii"].apply(null, arguments) };

Module["dynCall_X"] = dynCall_X
Module["dynCall_i"] = dynCall_i
Module["dynCall_if"] = dynCall_if
Module["dynCall_ii"] = dynCall_ii
Module["dynCall_iii"] = dynCall_iii
Module["dynCall_iiii"] = dynCall_iiii
Module["dynCall_iiiii"] = dynCall_iiiii
Module["dynCall_iiiiidii"] = dynCall_iiiiidii
Module["dynCall_iiiiif"] = dynCall_iiiiif
Module["dynCall_iiiiii"] = dynCall_iiiiii
Module["dynCall_iiiiiii"] = dynCall_iiiiiii
Module["dynCall_iiiiiiii"] = dynCall_iiiiiiii
Module["dynCall_iiiiiiiii"] = dynCall_iiiiiiiii
Module["dynCall_iiiiiiiiii"] = dynCall_iiiiiiiiii
Module["dynCall_j"] = dynCall_j
Module["dynCall_ji"] = dynCall_ji
Module["dynCall_jiji"] = dynCall_jiji
Module["dynCall_v"] = dynCall_v
Module["dynCall_vf"] = dynCall_vf
Module["dynCall_vff"] = dynCall_vff
Module["dynCall_vffff"] = dynCall_vffff
Module["dynCall_vfi"] = dynCall_vfi
Module["dynCall_vi"] = dynCall_vi
Module["dynCall_vif"] = dynCall_vif
Module["dynCall_viff"] = dynCall_viff
Module["dynCall_vifff"] = dynCall_vifff
Module["dynCall_viffff"] = dynCall_viffff
Module["dynCall_vii"] = dynCall_vii
Module["dynCall_viif"] = dynCall_viif
Module["dynCall_viii"] = dynCall_viii
Module["dynCall_viiii"] = dynCall_viiii
Module["dynCall_viiiii"] = dynCall_viiiii
Module["dynCall_viiiiii"] = dynCall_viiiiii
Module["dynCall_viiiiiii"] = dynCall_viiiiiii
Module["dynCall_viiiiiiii"] = dynCall_viiiiiiii
Module["dynCall_viiiiiiiii"] = dynCall_viiiiiiiii
Module["dynCall_viiiiiiiiii"] = dynCall_viiiiiiiiii
Module["dynCall_viiiiiiiiiii"] = dynCall_viiiiiiiiiii
;



// === Auto-generated postamble setup entry stuff ===

Module['asm'] = asm;

if (!Module["intArrayFromString"]) Module["intArrayFromString"] = function() { abort("'intArrayFromString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["intArrayToString"]) Module["intArrayToString"] = function() { abort("'intArrayToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["ccall"]) Module["ccall"] = function() { abort("'ccall' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["cwrap"]) Module["cwrap"] = function() { abort("'cwrap' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["setValue"]) Module["setValue"] = function() { abort("'setValue' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["getValue"]) Module["getValue"] = function() { abort("'getValue' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["allocate"]) Module["allocate"] = function() { abort("'allocate' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["getMemory"]) Module["getMemory"] = function() { abort("'getMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you") };
if (!Module["AsciiToString"]) Module["AsciiToString"] = function() { abort("'AsciiToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["stringToAscii"]) Module["stringToAscii"] = function() { abort("'stringToAscii' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["UTF8ArrayToString"]) Module["UTF8ArrayToString"] = function() { abort("'UTF8ArrayToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["UTF8ToString"]) Module["UTF8ToString"] = function() { abort("'UTF8ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["stringToUTF8Array"]) Module["stringToUTF8Array"] = function() { abort("'stringToUTF8Array' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["stringToUTF8"]) Module["stringToUTF8"] = function() { abort("'stringToUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["lengthBytesUTF8"]) Module["lengthBytesUTF8"] = function() { abort("'lengthBytesUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["UTF16ToString"]) Module["UTF16ToString"] = function() { abort("'UTF16ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["stringToUTF16"]) Module["stringToUTF16"] = function() { abort("'stringToUTF16' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["lengthBytesUTF16"]) Module["lengthBytesUTF16"] = function() { abort("'lengthBytesUTF16' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["UTF32ToString"]) Module["UTF32ToString"] = function() { abort("'UTF32ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["stringToUTF32"]) Module["stringToUTF32"] = function() { abort("'stringToUTF32' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["lengthBytesUTF32"]) Module["lengthBytesUTF32"] = function() { abort("'lengthBytesUTF32' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["allocateUTF8"]) Module["allocateUTF8"] = function() { abort("'allocateUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["stackTrace"]) Module["stackTrace"] = function() { abort("'stackTrace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["addOnPreRun"]) Module["addOnPreRun"] = function() { abort("'addOnPreRun' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["addOnInit"]) Module["addOnInit"] = function() { abort("'addOnInit' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["addOnPreMain"]) Module["addOnPreMain"] = function() { abort("'addOnPreMain' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["addOnExit"]) Module["addOnExit"] = function() { abort("'addOnExit' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["addOnPostRun"]) Module["addOnPostRun"] = function() { abort("'addOnPostRun' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["writeStringToMemory"]) Module["writeStringToMemory"] = function() { abort("'writeStringToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["writeArrayToMemory"]) Module["writeArrayToMemory"] = function() { abort("'writeArrayToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["writeAsciiToMemory"]) Module["writeAsciiToMemory"] = function() { abort("'writeAsciiToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["addRunDependency"]) Module["addRunDependency"] = function() { abort("'addRunDependency' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you") };
if (!Module["removeRunDependency"]) Module["removeRunDependency"] = function() { abort("'removeRunDependency' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you") };
if (!Module["ENV"]) Module["ENV"] = function() { abort("'ENV' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["FS"]) Module["FS"] = function() { abort("'FS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["FS_createFolder"]) Module["FS_createFolder"] = function() { abort("'FS_createFolder' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you") };
if (!Module["FS_createPath"]) Module["FS_createPath"] = function() { abort("'FS_createPath' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you") };
if (!Module["FS_createDataFile"]) Module["FS_createDataFile"] = function() { abort("'FS_createDataFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you") };
if (!Module["FS_createPreloadedFile"]) Module["FS_createPreloadedFile"] = function() { abort("'FS_createPreloadedFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you") };
if (!Module["FS_createLazyFile"]) Module["FS_createLazyFile"] = function() { abort("'FS_createLazyFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you") };
if (!Module["FS_createLink"]) Module["FS_createLink"] = function() { abort("'FS_createLink' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you") };
if (!Module["FS_createDevice"]) Module["FS_createDevice"] = function() { abort("'FS_createDevice' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you") };
if (!Module["FS_unlink"]) Module["FS_unlink"] = function() { abort("'FS_unlink' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you") };
if (!Module["GL"]) Module["GL"] = function() { abort("'GL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["dynamicAlloc"]) Module["dynamicAlloc"] = function() { abort("'dynamicAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["warnOnce"]) Module["warnOnce"] = function() { abort("'warnOnce' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["loadDynamicLibrary"]) Module["loadDynamicLibrary"] = function() { abort("'loadDynamicLibrary' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["loadWebAssemblyModule"]) Module["loadWebAssemblyModule"] = function() { abort("'loadWebAssemblyModule' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["getLEB"]) Module["getLEB"] = function() { abort("'getLEB' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["getFunctionTables"]) Module["getFunctionTables"] = function() { abort("'getFunctionTables' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["alignFunctionTables"]) Module["alignFunctionTables"] = function() { abort("'alignFunctionTables' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["registerFunctions"]) Module["registerFunctions"] = function() { abort("'registerFunctions' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["addFunction"]) Module["addFunction"] = function() { abort("'addFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["removeFunction"]) Module["removeFunction"] = function() { abort("'removeFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["getFuncWrapper"]) Module["getFuncWrapper"] = function() { abort("'getFuncWrapper' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["prettyPrint"]) Module["prettyPrint"] = function() { abort("'prettyPrint' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["makeBigInt"]) Module["makeBigInt"] = function() { abort("'makeBigInt' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["dynCall"]) Module["dynCall"] = function() { abort("'dynCall' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["getCompilerSetting"]) Module["getCompilerSetting"] = function() { abort("'getCompilerSetting' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["stackSave"]) Module["stackSave"] = function() { abort("'stackSave' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["stackRestore"]) Module["stackRestore"] = function() { abort("'stackRestore' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["stackAlloc"]) Module["stackAlloc"] = function() { abort("'stackAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["establishStackSpace"]) Module["establishStackSpace"] = function() { abort("'establishStackSpace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["print"]) Module["print"] = function() { abort("'print' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["printErr"]) Module["printErr"] = function() { abort("'printErr' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["getTempRet0"]) Module["getTempRet0"] = function() { abort("'getTempRet0' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["setTempRet0"]) Module["setTempRet0"] = function() { abort("'setTempRet0' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["Pointer_stringify"]) Module["Pointer_stringify"] = function() { abort("'Pointer_stringify' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };if (!Module["ALLOC_NORMAL"]) Object.defineProperty(Module, "ALLOC_NORMAL", { get: function() { abort("'ALLOC_NORMAL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") } });
if (!Module["ALLOC_STACK"]) Object.defineProperty(Module, "ALLOC_STACK", { get: function() { abort("'ALLOC_STACK' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") } });
if (!Module["ALLOC_DYNAMIC"]) Object.defineProperty(Module, "ALLOC_DYNAMIC", { get: function() { abort("'ALLOC_DYNAMIC' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") } });
if (!Module["ALLOC_NONE"]) Object.defineProperty(Module, "ALLOC_NONE", { get: function() { abort("'ALLOC_NONE' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") } });




/**
 * @constructor
 * @extends {Error}
 * @this {ExitStatus}
 */
function ExitStatus(status) {
  this.name = "ExitStatus";
  this.message = "Program terminated with exit(" + status + ")";
  this.status = status;
};
ExitStatus.prototype = new Error();
ExitStatus.prototype.constructor = ExitStatus;

var calledMain = false;

dependenciesFulfilled = function runCaller() {
  // If run has never been called, and we should call run (INVOKE_RUN is true, and Module.noInitialRun is not false)
  if (!Module['calledRun']) run();
  if (!Module['calledRun']) dependenciesFulfilled = runCaller; // try this again later, after new deps are fulfilled
}

Module['callMain'] = function callMain(args) {
  assert(runDependencies == 0, 'cannot call main when async dependencies remain! (listen on Module["onRuntimeInitialized"])');
  assert(__ATPRERUN__.length == 0, 'cannot call main when preRun functions remain to be called');

  args = args || [];

  ensureInitRuntime();

  var argc = args.length+1;
  var argv = stackAlloc((argc + 1) * 4);
  HEAP32[argv >> 2] = allocateUTF8OnStack(Module['thisProgram']);
  for (var i = 1; i < argc; i++) {
    HEAP32[(argv >> 2) + i] = allocateUTF8OnStack(args[i - 1]);
  }
  HEAP32[(argv >> 2) + argc] = 0;


  try {

    var ret = Module['_main'](argc, argv, 0);


    // if we're not running an evented main loop, it's time to exit
      exit(ret, /* implicit = */ true);
  }
  catch(e) {
    if (e instanceof ExitStatus) {
      // exit() throws this once it's done to make sure execution
      // has been stopped completely
      return;
    } else if (e == 'SimulateInfiniteLoop') {
      // running an evented main loop, don't immediately exit
      Module['noExitRuntime'] = true;
      return;
    } else {
      var toLog = e;
      if (e && typeof e === 'object' && e.stack) {
        toLog = [e, e.stack];
      }
      err('exception thrown: ' + toLog);
      Module['quit'](1, e);
    }
  } finally {
    calledMain = true;
  }
}




/** @type {function(Array=)} */
function run(args) {
  args = args || Module['arguments'];

  if (runDependencies > 0) {
    return;
  }

  writeStackCookie();

  preRun();

  if (runDependencies > 0) return; // a preRun added a dependency, run will be called later
  if (Module['calledRun']) return; // run may have just been called through dependencies being fulfilled just in this very frame

  function doRun() {
    if (Module['calledRun']) return; // run may have just been called while the async setStatus time below was happening
    Module['calledRun'] = true;

    if (ABORT) return;

    ensureInitRuntime();

    preMain();

    if (Module['onRuntimeInitialized']) Module['onRuntimeInitialized']();

    if (Module['_main'] && shouldRunNow) Module['callMain'](args);

    postRun();
  }

  if (Module['setStatus']) {
    Module['setStatus']('Running...');
    setTimeout(function() {
      setTimeout(function() {
        Module['setStatus']('');
      }, 1);
      doRun();
    }, 1);
  } else {
    doRun();
  }
  checkStackCookie();
}
Module['run'] = run;

function checkUnflushedContent() {
  // Compiler settings do not allow exiting the runtime, so flushing
  // the streams is not possible. but in ASSERTIONS mode we check
  // if there was something to flush, and if so tell the user they
  // should request that the runtime be exitable.
  // Normally we would not even include flush() at all, but in ASSERTIONS
  // builds we do so just for this check, and here we see if there is any
  // content to flush, that is, we check if there would have been
  // something a non-ASSERTIONS build would have not seen.
  // How we flush the streams depends on whether we are in FILESYSTEM=0
  // mode (which has its own special function for this; otherwise, all
  // the code is inside libc)
  var print = out;
  var printErr = err;
  var has = false;
  out = err = function(x) {
    has = true;
  }
  try { // it doesn't matter if it fails
    var flush = Module['_fflush'];
    if (flush) flush(0);
    // also flush in the JS FS layer
    var hasFS = true;
    if (hasFS) {
      ['stdout', 'stderr'].forEach(function(name) {
        var info = FS.analyzePath('/dev/' + name);
        if (!info) return;
        var stream = info.object;
        var rdev = stream.rdev;
        var tty = TTY.ttys[rdev];
        if (tty && tty.output && tty.output.length) {
          has = true;
        }
      });
    }
  } catch(e) {}
  out = print;
  err = printErr;
  if (has) {
    warnOnce('stdio streams had content in them that was not flushed. you should set EXIT_RUNTIME to 1 (see the FAQ), or make sure to emit a newline when you printf etc.');
  }
}

function exit(status, implicit) {
  checkUnflushedContent();

  // if this is just main exit-ing implicitly, and the status is 0, then we
  // don't need to do anything here and can just leave. if the status is
  // non-zero, though, then we need to report it.
  // (we may have warned about this earlier, if a situation justifies doing so)
  if (implicit && Module['noExitRuntime'] && status === 0) {
    return;
  }

  if (Module['noExitRuntime']) {
    // if exit() was called, we may warn the user if the runtime isn't actually being shut down
    if (!implicit) {
      err('exit(' + status + ') called, but EXIT_RUNTIME is not set, so halting execution but not exiting the runtime or preventing further async execution (build with EXIT_RUNTIME=1, if you want a true shutdown)');
    }
  } else {

    ABORT = true;
    EXITSTATUS = status;

    exitRuntime();

    if (Module['onExit']) Module['onExit'](status);
  }

  Module['quit'](status, new ExitStatus(status));
}

var abortDecorators = [];

function abort(what) {
  if (Module['onAbort']) {
    Module['onAbort'](what);
  }

  if (what !== undefined) {
    out(what);
    err(what);
    what = JSON.stringify(what)
  } else {
    what = '';
  }

  ABORT = true;
  EXITSTATUS = 1;

  var extra = '';
  var output = 'abort(' + what + ') at ' + stackTrace() + extra;
  if (abortDecorators) {
    abortDecorators.forEach(function(decorator) {
      output = decorator(output, what);
    });
  }
  throw output;
}
Module['abort'] = abort;

if (Module['preInit']) {
  if (typeof Module['preInit'] == 'function') Module['preInit'] = [Module['preInit']];
  while (Module['preInit'].length > 0) {
    Module['preInit'].pop()();
  }
}

// shouldRunNow refers to calling main(), not run().
var shouldRunNow = true;
if (Module['noInitialRun']) {
  shouldRunNow = false;
}

  Module["noExitRuntime"] = true;

run();



// {{MODULE_ADDITIONS}}



