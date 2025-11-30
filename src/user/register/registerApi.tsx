import axios from "axios";
import CONFIG from "../../const/appConfig.tsx";
import {message} from "antd";
import type {CommonResponse} from "../../const/apiCommon.tsx";
import {JSEncrypt} from "jsencrypt";

export async function handleRegister(form: any) {
    const encryptedInfo = await encryptPassword(form.password);
    if(!encryptedInfo) {
        return;
    }
    await axios.post<CommonResponse<any>>(
        `${CONFIG.userApi}/user/register`,
         {
             ...encryptedInfo,
             "userName": form.userName,
             "nickName": form.nickName
        }
    ).then(response => {
        if(!response.data.success) {
            message.error(response.data.message)
            return
        }
        message.success('注册成功')
        console.log('registered userId: ' + response.data.data)
    }).catch(err => {
        message.error('注册失败')
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
        message.error('提交失败')
        console.error(err)
        return null;
    }

}

async function getPublicKeyInfo() {
    return await axios.get<CommonResponse<any>>(
        `${CONFIG.userApi}/user/register/encryptKey`
    ).then(response => {
        if(!response.data.success) {
            message.error(response.data.message)
        }
        return response.data.data;
    }).catch(err => {
        message.error('提交失败')
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