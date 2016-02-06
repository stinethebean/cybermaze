using UnityEngine;
using System.Collections;
using SocketIO;
using System;

public class SocketIoSetup : MonoBehaviour {

	// Use this for initialization
	void Start () {

        GameObject go = GameObject.Find("SocketIO");
        SocketIOComponent socket = go.GetComponent<SocketIOComponent>();
        socket.On("login", connectCallback);
        socket.On("move", moveCallback);
        Debug.Log("Connecting");
    }

    private void moveCallback(SocketIOEvent obj)
    {
        Debug.Log(string.Format("[name: {0}, data: {1}]", obj.name, obj.data));
    }

    public void connectCallback(SocketIOEvent e)
    {
        Debug.Log(string.Format("[name: {0}, data: {1}]", e.name, e.data));
    }

    // Update is called once per frame
    void Update () {
	
	}
}
