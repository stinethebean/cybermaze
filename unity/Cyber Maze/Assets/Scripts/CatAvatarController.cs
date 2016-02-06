using UnityEngine;
using System.Collections;
using Assets.Scripts;

public class CatAvatarController : MonoBehaviour, IAvatarController {

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

    public void HandleMove(Vector3 targetPos, int tileMoveCount)
    {
        // for the cat, we need to face the cat towards the tile we're moving to
        iTween.LookTo(gameObject, targetPos, 0.4f);
        iTween.MoveTo(gameObject, targetPos, tileMoveCount * 1f);
    }
}
