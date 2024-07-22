package cordova.plugin.mds;

import de.re.easymodbus.modbusclient.ModbusClient;
import de.re.easymodbus.exceptions.ModbusException;
import java.io.IOException;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * This class echoes a string called from JavaScript.
 */
public class mds extends CordovaPlugin {

    static ModbusClient modbusClient = null;
    Thread newThread = null;

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("open")) {
            String ip = args.getString(0);
            int puerto = args.getInt(1);
            modbusClient = new ModbusClient(ip, puerto);
            try {
                modbusClient.Connect();
                callbackContext.success(String.valueOf(modbusClient.isConnected()));
            } catch (IOException iOException) {
                callbackContext.error(iOException.getMessage());
            }
            return true;
        } else if (action.equals("leer") && modbusClient.isConnected()) {
            int quantity = args.getInt(0);
            newThread = new Thread(() -> {
                String regs = null;
                try {
                    int[] inputRegisters = modbusClient.ReadHoldingRegisters(0, quantity);
                    regs = "";
                    for (int i = 0; i < inputRegisters.length; i++) {
                        regs = regs + String.valueOf(inputRegisters[i]) + "|";
                    }
                    callbackContext.success(regs);
                } catch (ModbusException | IOException modbusException) {
                    callbackContext.error(modbusException.getMessage());
                }
            });
            if (!newThread.isAlive()) {
                newThread.start();
            }
            return true;
        } else if (action.equals("escribir") && modbusClient.isConnected()) {
            try {
                int registro = args.getInt(0);
                int valor = args.getInt(1);
                modbusClient.WriteSingleRegister(registro, valor);
                callbackContext.success("true");
            } catch (ModbusException | IOException modbusException) {
                callbackContext.error(modbusException.getMessage());
            }
            return true;
        } else if (action.equals("desconectar") && modbusClient.isConnected()) {
            try {
                modbusClient.Disconnect();
                callbackContext.success("true");
            } catch (IOException iOException) {
                callbackContext.error(iOException.getMessage());
            }
            return true;
        }
        return false;
    }

    private void coolMethod(String message, CallbackContext callbackContext) {
        if (message != null && message.length() > 0) {
            callbackContext.success(message);
        } else {
            callbackContext.error("Expected one non-empty string argument.");
        }
    }
}
