using UnityEngine;
using System.Collections;
using Assets.Scripts;

public class MouseAvatarController : MonoBehaviour, IAvatarController {

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

    public void HandleMove(Vector3 targetPos, int tileMoveCount)
    {
        iTween.LookTo(gameObject, targetPos, 0.1f);
        iTween.MoveTo(gameObject, targetPos, 0.1f);
    }
}
