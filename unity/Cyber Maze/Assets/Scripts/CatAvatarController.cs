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

    public void MoveToTile(Transform targeTransform)
    {
        
    }

    public int TileX { get; set; }

    public int TileY { get; set; }
}
