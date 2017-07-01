// 学习参考，via:https://www.lingchenxuan.com/2017/06/26/后台类系统组件-通知/
class Notify {
    constructor() {
        this.createContainer()
        this.defaultOption = {
            duration: 1500, // 持续时间
            type: 'warn' // 提示的类型
        }
        this.animationDuration = 240
    }
    // 在body插入一个div，作为通知组件的容器
    createContainer() {
        this.container = doucment.createElement('div')
        this.container.className = 'dd-notifies'
        document.body.appendChild(this.container)
    }

    add(msg, opt) {
        const option = { ...this.defaultOption, ...opt } // 混合自定义参数与默认参数

        const notify = document.createElement('div')
        const typeClassName = `dd-notify-${option.type}`
        notify.className = `dd-notify dd-notify-active ${typeClassName}`

        const msgNode = document.createTextNode(msg)
        notify.appendChild(msgNode)
        this.container.appendChild(notify)
        setTimeout(() => notify.classList.remove('dd-notify-active'), 0)

        this.hide(notify, option.duration)
    }

    hide(notify, duration) {
        setTimeout(() => {
            notify.classList.add('dd-notify-active')
            setTimeout(() => this.container.removeChild(notify), this.animationDuration)
        }, duration)
    }
}

let notifyInstance
function getNotifyInstance() {
    notifyInstance = notifyInstance || new Notify()
    return notifyInstance
}

const notifyType = ['error', 'warn', 'success']

notifyType.map(type => {
    window[type] = function(msg, opt) {
        const notify = getNotifyInstance()
        notify.add(msg, { type: type, ...opt })
    }
})
