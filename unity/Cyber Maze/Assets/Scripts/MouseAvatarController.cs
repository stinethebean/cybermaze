﻿using UnityEngine;
using System.Collections;
using Assets.Scripts;

public class MouseAvatarController : MonoBehaviour, IAvatarController {

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

    public void MoveToTile(Transform targeTransform)
    {
        throw new System.NotImplementedException();
    }

    public int TileX { get; set; }

    public int TileY { get; set; }
}
