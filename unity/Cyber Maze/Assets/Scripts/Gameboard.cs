using UnityEngine;
using System.Collections;
using System.Linq;
using System.Security.Policy;
using Assets.Scripts;

public class Gameboard : MonoBehaviour
{
    public GameObject CatPrefab;
    public GameObject MousePrefab;
    public GameObject TilePrefab;
    public GameObject WallPrefab;
    public int NumberOfTilesX;
    public int NumberOfTilesY;
    public float TileSpacing;

    private GameObject[] _tiles;
    private GameObject[] _pieces;

	// Use this for initialization
	void Start () {
        // get and layout the gameboard
	    CreateGameboard(8);
        //CenterCameraOnGameboard();
	    CreateGamePieces("player1", "player2");

	}
	
	// Update is called once per frame
	void Update () {
	    if (Time.realtimeSinceStartup > 10.0f && Time.realtimeSinceStartup < 11.0f)
	    {
	        var controller = _pieces[0].GetComponent<IAvatarController>();
            controller.HandleMove(_tiles[1].transform.position, 1);
	    }
	}

    public void MovePlayerToTile(string playerId, int tileX, int tileY)
    {
        var targetTile = _tiles.FirstOrDefault(t => t.name == string.Format("tile_{0}_{1}", tileX, tileY));
        if(targetTile == null) return;

        var piece = _pieces.FirstOrDefault(p => p.name == playerId);

        if (piece != null)
        {
            var controller = piece.GetComponent<IAvatarController>();
            controller.HandleMove(targetTile.transform.position, 0);
        }
            
    }

    public void CreateGamePieces(string player1Id, string player2Id)
    {
        _pieces = new GameObject[2];

        var cat = Instantiate(CatPrefab);
        cat.name = player1Id;
        _pieces[0] = cat;
        MovePlayerToTile(player1Id, 0, 0);

        var mouse = Instantiate(MousePrefab);
        mouse.name = player2Id;
        _pieces[1] = mouse;
        MovePlayerToTile(player2Id, NumberOfTilesX -1, NumberOfTilesY - 1);
    }

    public void CreateGameboard(int numberOfTiles)
    {
        NumberOfTilesX = numberOfTiles;
        NumberOfTilesY = numberOfTiles;

        var totalTiles = numberOfTiles * numberOfTiles;
        var tileSpacingHalf = TileSpacing/2f;

        _tiles = new GameObject[totalTiles];
        var tileCount = 0;

        for (var y = 0; y < NumberOfTilesY; y++)
        {
            for (var x = 0; x < NumberOfTilesX; x++)
            {
                var tile = Instantiate(TilePrefab);
                tile.name = string.Format("tile_{0}_{1}", x, y);
                tile.transform.position = new Vector3(x * TileSpacing, 0, y * -TileSpacing);
                tile.transform.parent = transform;
                _tiles[tileCount++] = tile;

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
                    rightWall.transform.parent = tile.transform;
                    rightWall.name = string.Format("{0}_right", tile.name);
                    rightWall.transform.localPosition = new Vector3(tileSpacingHalf, -5, 0);
                    rightWall.transform.eulerAngles = new Vector3(0, 90, 0);
                    
                }

                if (y == NumberOfTilesY - 1)
                {
                    // create the bottom wall
                    var bottomWall = Instantiate(WallPrefab);
                    bottomWall.transform.parent = tile.transform;
                    bottomWall.name = string.Format("{0}_bot", tile.name);
                    bottomWall.transform.localPosition = new Vector3(0, -5, -tileSpacingHalf);
                    
                }
            }
        }
        CenterCameraOnGameboard();
    }

    void CenterCameraOnGameboard()
    {
        var camera = Camera.main;
        camera.orthographicSize = (NumberOfTilesY* TileSpacing) /2f;
        var tileHalfSize = (TileSpacing/2);
        camera.transform.position = new Vector3(((NumberOfTilesX * TileSpacing) / 2f) - tileHalfSize, 10f, -(((NumberOfTilesY * TileSpacing) / 2f) - tileHalfSize));
    }
}
