const _ALL_ENV_ = `
APP_NAME="lara-io"
APP_ENV=local
APP_KEY=
APP_DEBUG=true

SERVER_NAME=localhost
SERVER_PORT=80
SERVER_TRANSPORT=tcp

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=db-lara-io
DB_USERNAME=root
DB_PASSWORD=""
DB_ENGINE="MyISAM"

BROADCAST_DRIVER=log
CACHE_DRIVER=redis
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120
SESSION_DOMAIN=artify.test

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=af7ab596200298
MAIL_PASSWORD=d9d51a05c7c087
MAIL_ENCRYPTION=tls

AWS_ACCESS_KEY_ID=null
AWS_SECRET_ACCESS_KEY=null
AWS_DEFAULT_REGION=null
AWS_BUCKET=null

PUSHER_APP_ID=null
PUSHER_APP_KEY=null
PUSHER_APP_SECRET=null
PUSHER_APP_CLUSTER=null

TELEGRAM_BOT_NAME=null
TELEGRAM_TOKEN=null

FACEBOOK_CLIENT_ID=null
FACEBOOK_CLIENT_SECRET=null
FACEBOOK_URL=null

GOOGLE_CLIENT_ID=null
GOOGLE_CLIENT_SECRET=null
GOOGLE_URL=null
`;

async function downloadProyect(path:string, os: string) {
    let proccess: Deno.Process;

    if (os === "windows") {
        proccess = Deno.run({
            cmd: [
                "curl",
                "-L",
                "https://github.com/JackBello/web-lara-io/archive/refs/heads/master.zip",
                "--output",
                `${path}\\master.zip`
            ],
            stdout: "piped",
            stderr: "piped",
        });

        const { code } = await proccess.status();

        if (code !== 0) {
            console.log("Error downloading proyect");
        }
    }
}

async function unzipProyect(path:string, os: string) {
    if (os === "windows") {
        const proccess = Deno.run({
            cmd: [
                "powershell.exe",
                "Expand-Archive",
                "-Path",
                path + "/master.zip",
                "-DestinationPath",
                path
            ],
            stdout: "piped",
            stderr: "piped",
        });

        const { code } = await proccess.status();

        if (code !== 0) {
            console.log("Error unzipping proyect");
        }
    }
}

export default async function createProyect(name: string, path: string, os: string) {
    const _BASIC_ENV_ = `
    APP_NAME="${name}"
    APP_ENV=local
    APP_DEBUG=true

    SERVER_NAME=localhost
    SERVER_PORT=80
    SERVER_TRANSPORT=tcp
    `;

    await downloadProyect(path, os);
    await unzipProyect(path, os);

    Deno.removeSync(path + "/master.zip");
    Deno.renameSync(path + "/web-lara-io-master", path + "/" + name);
    Deno.writeTextFileSync(path + "/" + name + "/.env", _BASIC_ENV_);
}
