import {message} from "antd";
import axios from "axios";
import type {CommonResponse} from "../../const/apiCommon.tsx";
import CONFIG from "../../const/appConfig.tsx";
import {JSEncrypt} from "jsencrypt";


export async function isLogin() {
    return await axios.get<CommonResponse<string>>(
        `${CONFIG.userApi}/login/isLogin`,
        {
            withCredentials: true
        }
    ).then(response => response.data.data === 'true')
}

export async function handleLogin(form: any) {
    const encryptedInfo = await encryptPassword(form.password);
    if(!encryptedInfo) {
        return;
    }
    await axios.post<CommonResponse<any>>(
        `${CONFIG.userApi}/login`,
        {
            ...encryptedInfo,
            "userName": form.userName
        },
        {
            withCredentials: true
        }
    ).then(response => {
        if(!response.data.success) {
            message.error(response.data.message)
            return
        }
        message.success('登录成功')
        if(window.location.search) {
            const from = window.location.search
                .split('&')
                .find(pair => pair.startsWith('?from') || pair.startsWith('from'))
                ?.split('=')
                ?.[1]
            if(from) {
                window.location.href = decodeURIComponent(from)
            }
        }
    }).catch(err => {
        message.error('系统繁忙')
        console.error(err)
    });
}


async function encryptPassword(password: any) {
    const publicKeyInfo = await getPublicKeyInfo();
    if(!publicKeyInfo) {
        return null;
    }
    try {
        const encrypted = encryptWithJSEncrypt(publicKeyInfo.publicKey, password);
        return {
            "keyPair": publicKeyInfo.keyPair,
            "encryptedPasswordBase64": encrypted
        };
    } catch (err) {
        message.error('系统繁忙')
        console.error(err)
        return null;
    }

}

async function getPublicKeyInfo() {
    return await axios.get<CommonResponse<any>>(
        `${CONFIG.userApi}/login/encryptKey`
    ).then(response => {
        if(!response.data.success) {
            message.error(response.data.message)
        }
        return response.data.data;
    }).catch(err => {
        message.error('系统繁忙')
        console.error(err)
        return null;
    });
}

function encryptWithJSEncrypt(publicKey: string, plaintext: string) {
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(publicKey);

    const encrypted = encrypt.encrypt(plaintext);
    if (!encrypted) {
        throw new Error('加密失败');
    }

    return encrypted;
}