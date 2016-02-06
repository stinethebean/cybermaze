using UnityEngine;
using System.Collections;

public class GameboardBehavior : MonoBehaviour
{
    public GameObject TilePrefab;
    public int NumberOfTilesX;
    public int NumberOfTilesY;
    public int TileSpacing;

    private GameObject[] _tiles;

	// Use this for initialization
	void Start () {
        // get and layout the gameboard
	    CreateGameboard();
	    CenterCameraOnGameboard();
	}
	
	// Update is called once per frame
	void Update () {
	
	}

    void CreateGameboard()
    {
        var totalTiles = NumberOfTilesX*NumberOfTilesY;

        _tiles = new GameObject[totalTiles];

        for (var y = 0; y < NumberOfTilesY; y++)
        {
            for (var x = 0; x < NumberOfTilesX; x++)
            {
                var tile = Instantiate(TilePrefab);
                tile.name = string.Format("tile_{0}_{1}", x, y);
                tile.transform.position = new Vector3(x * 10, 0, y * 10);
                tile.transform.parent = transform;
            }

        }
    }

    void CenterCameraOnGameboard()
    {
        var camera = Camera.main;
        camera.orthographicSize = (NumberOfTilesY* TileSpacing) /2f;
        var tileHalfSize = (TileSpacing/2);
        camera.transform.position = new Vector3(((NumberOfTilesX * TileSpacing) / 2f) - tileHalfSize, 10f, ((NumberOfTilesY * TileSpacing) / 2f) - tileHalfSize);
    }
}
