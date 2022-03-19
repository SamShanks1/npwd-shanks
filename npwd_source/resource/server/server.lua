local QBCore = exports['qb-core']:GetCoreObject()

local function GenerateMailId()
    return math.random(111111, 999999)
end

RegisterNetEvent('qb-phone:server:sendNewMail', function(mailData)
    local src = source
    local Player = QBCore.Functions.GetPlayer(src)
    local mailid = GenerateMailId()
    if mailData.button == nil then
        MySQL.insert('INSERT INTO player_mails (`citizenid`, `sender`, `subject`, `message`, `mailid`, `read`) VALUES (?, ?, ?, ?, ?, ?)', { Player.PlayerData.citizenid, mailData.sender, mailData.subject, mailData.message, mailid, 0 })
    else
        MySQL.insert('INSERT INTO player_mails (`citizenid`, `sender`, `subject`, `message`, `mailid`, `read`, `button`) VALUES (?, ?, ?, ?, ?, ?, ?)', { Player.PlayerData.citizenid, mailData.sender, mailData.subject, mailData.message, mailid, 0, json.encode(mailData.button) })
    end
    mailData.button.buttonData.coords = {
        x = mailData.button.buttonData.coords.x,
        y = mailData.button.buttonData.coords.y,
        z = mailData.button.buttonData.coords.z
    }
    local mailInfo = {
        sender = mailData.sender,
        subject = mailData.subject,
        message = mailData.message,
        mailid = mailid,
        read = 0,
        date = "Wed Mar 09 2022 12:07:12 GMT+0000 (Greenwich Mean Time)";
        button = mailData.button,
    }
    TriggerClientEvent('npwd:sendMailBroadcastAddNew', src, {type = "ADD", mail = mailInfo})
end)



RegisterNetEvent('qb-phone:server:sendNewMailToOffline', function(citizenid, mailData)
    local Player = QBCore.Functions.GetPlayerByCitizenId(citizenid)
    local mailid = GenerateMailId()
    if Player then
        local src = Player.PlayerData.source
        if mailData.button == nil then
            MySQL.insert('INSERT INTO player_mails (`citizenid`, `sender`, `subject`, `message`, `mailid`, `read`) VALUES (?, ?, ?, ?, ?, ?)', { Player.PlayerData.citizenid, mailData.sender, mailData.subject, mailData.message, mailid, 0 })
        else
            MySQL.insert('INSERT INTO player_mails (`citizenid`, `sender`, `subject`, `message`, `mailid`, `read`, `button`) VALUES (?, ?, ?, ?, ?, ?, ?)', { Player.PlayerData.citizenid, mailData.sender, mailData.subject, mailData.message, mailid, 0, json.encode(mailData.button) })
        end
        local mailInfo = {
            sender = mailData.sender,
            subject = mailData.subject,
            message = mailData.message,
            mailid = mailid,
            read = 0,
            date = "Wed Mar 09 2022 12:07:12 GMT+0000 (Greenwich Mean Time)";
            button = mailData.button,
        }
        TriggerClientEvent('npwd:sendMailBroadcastAddNew', src, { type = "ADD", mail = mailInfo })
    else
        if mailData.button == nil then
            MySQL.insert('INSERT INTO player_mails (`citizenid`, `sender`, `subject`, `message`, `mailid`, `read`) VALUES (?, ?, ?, ?, ?, ?)', { citizenid, mailData.sender, mailData.subject, mailData.message, mailid, 0 })
        else
            MySQL.insert('INSERT INTO player_mails (`citizenid`, `sender`, `subject`, `message`, `mailid`, `read`, `button`) VALUES (?, ?, ?, ?, ?, ?, ?)', { citizenid, mailData.sender, mailData.subject, mailData.message, mailid, 0, json.encode(mailData.button) })
        end
    end
end)

RegisterNetEvent('qb-phone:server:sendNewEventMail', function(citizenid, mailData)
    local Player = QBCore.Functions.GetPlayerByCitizenId(citizenid)
    local mailid = GenerateMailId()
    if mailData.button == nil then
        MySQL.insert('INSERT INTO player_mails (`citizenid`, `sender`, `subject`, `message`, `mailid`, `read`) VALUES (?, ?, ?, ?, ?, ?)', { citizenid, mailData.sender, mailData.subject, mailData.message, mailid, 0 })
    else
        MySQL.insert('INSERT INTO player_mails (`citizenid`, `sender`, `subject`, `message`, `mailid`, `read`, `button`) VALUES (?, ?, ?, ?, ?, ?, ?)', { citizenid, mailData.sender, mailData.subject, mailData.message, mailid, 0, json.encode(mailData.button) })
    end
    local src = Player.PlayerData.source
    local mailInfo = {
        sender = mailData.sender,
        subject = mailData.subject,
        message = mailData.message,
        mailid = mailid,
        read = 0,
        date = "Wed Mar 09 2022 12:07:12 GMT+0000 (Greenwich Mean Time)";
        button = mailData.button,
    }
    TriggerClientEvent('npwd:sendMailBroadcastAddNew', src, { type = "ADD", mail = mailInfo })
end)