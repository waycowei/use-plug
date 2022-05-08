import { isFunction, warn } from './utils'

type PluginInstallFunction<Host> = (host: Host, ...options: any[]) => any

export type Plugin<Host> =
  | (PluginInstallFunction<Host> & { install?: PluginInstallFunction<Host> })
  | {
    install: PluginInstallFunction<Host>
  }

export type PlugInstance<Host> = Host & PlugHost<Host>

interface UseOptions {
  __DEV__?: boolean
}

interface PlugHost<Host> {
  use: (plugin: Plugin<Host>, ...options: any[]) => PlugInstance<Host>
  _installedPlugin: Set<Plugin<Host>>
  [x: string]: any
}

function createUse<Host>(host: Host, useOptions?: UseOptions): PlugInstance<Host>
function createUse<Host>(host: Host & PlugHost<Host>, useOptions?: UseOptions) {
  const { __DEV__ } = useOptions ?? {}
  const installedPlugins = host._installedPlugin ?? []
  // https://github.com/vuejs/core/blob/main/packages/runtime-core/src/apiCreateApp.ts#L218
  host.use = function (plugin: Plugin<Host>, ...options: any[]) {
    if (installedPlugins.has(plugin)) {
      __DEV__ && warn('Plugin has already been applied.')
    }
    else if (plugin && isFunction(plugin.install)) {
      installedPlugins.add(plugin)
      plugin.install(host, ...options)
    }
    else if (isFunction(plugin)) {
      installedPlugins.add(plugin)
      plugin(host, ...options)
    }
    else if (__DEV__) {
      warn('A plugin must either be a function or an object with an "install" function.')
    }
    host._installedPlugin = installedPlugins
    return host
  }
  return host
}

export default {
  createUse,
}
