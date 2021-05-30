// app.js
App({
    onLaunch: () => {
        wx.cloud.init({
            env: 'cloud1-5g0adq3k2ef4fac3',
            traceUser: true
        });
    }
})