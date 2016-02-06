using UnityEngine;
using System.Collections;

public class GameboardBehavior : MonoBehaviour
{
    public GameObject CatPrefab;
    public GameObject MousePrefab;
    public GameObject TilePrefab;
    public GameObject WallPrefab;
    public int NumberOfTilesX;
    public int NumberOfTilesY;
    public float TileSpacing;

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
        var tileSpacingHalf = TileSpacing/2f;

        _tiles = new GameObject[totalTiles];

        for (var y = 0; y < NumberOfTilesY; y++)
        {
            for (var x = 0; x < NumberOfTilesX; x++)
            {
                var tile = Instantiate(TilePrefab);
                tile.name = string.Format("tile_{0}_{1}", x, y);
                tile.transform.position = new Vector3(x * TileSpacing, 0, y * -TileSpacing);
                tile.transform.parent = transform;

                var leftWall = Instantiate(WallPrefab);
                leftWall.transform.parent = tile.transform;
                leftWall.name = string.Format("{0}_left", tile.name);
                leftWall.transform.localPosition = new Vector3(-tileSpacingHalf, -5, 0);
                leftWall.transform.eulerAngles = new Vector3(0, 90, 0);
                
                var topWall = Instantiate(WallPrefab);
                topWall.transform.parent = tile.transform;
                topWall.name = string.Format("{0}_top", tile.name);
                topWall.transform.localPosition = new Vector3(0, -5, tileSpacingHalf);
                
                if (x == NumberOfTilesX - 1)
                {
                    // create the right wall
                    var rightWall = Instantiate(WallPrefab);
                    rightWall.name = string.Format("{0}_right", tile.name);
                    rightWall.transform.localPosition = new Vector3(tileSpacingHalf, -5, 0);
                    rightWall.transform.eulerAngles = new Vector3(0, 90, 0);
                    rightWall.transform.parent = tile.transform;
                }

                if (y == NumberOfTilesY - 1)
                {
                    // create the bottom wall
                    var bottomWall = Instantiate(WallPrefab);
                    bottomWall.name = string.Format("{0}_bot", tile.name);
                    topWall.transform.localPosition = new Vector3(0, -5, -tileSpacingHalf);
                    topWall.transform.parent = tile.transform;
                }
            }
        }
    }

    void CenterCameraOnGameboard()
    {
        var camera = Camera.main;
        camera.orthographicSize = (NumberOfTilesY* TileSpacing) /2f;
        var tileHalfSize = (TileSpacing/2);
        camera.transform.position = new Vector3(((NumberOfTilesX * TileSpacing) / 2f) - tileHalfSize, 10f, -(((NumberOfTilesY * TileSpacing) / 2f) - tileHalfSize));
    }
}
