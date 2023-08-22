

const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'blahsomething',
    db: 'codial-development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'learn.designwithas@gmail.com',
            pass: 'mqxovwsmbnbbdaqf'
        }
    },
    google_client_id:"994559358348-706migk1rjgjja3gtq7rc8a2gd5em7tp.apps.googleusercontent.com",
    google_client_secret: "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",
    google_callback_url: "http://localhost:8000/users/auth/google/callback",
    jwt_key: 'codial'
}

const production = {
    name: 'production'
}

module.exports = development;