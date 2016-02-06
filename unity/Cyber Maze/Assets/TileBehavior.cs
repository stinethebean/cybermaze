using UnityEngine;
using System.Collections;

public class TileBehavior : MonoBehaviour
{

    public bool IsActivated;
    public Texture2D DeactivatedTexture;
    public Texture2D ActivateTexture;

    private Renderer _renderer;

	// Use this for initialization
	void Start ()
	{
	    _renderer = GetComponent<Renderer>();

	}
	
	// Update is called once per frame
	void Update ()
	{
	    var texture = _renderer.material.mainTexture;

        if (IsActivated && texture != ActivateTexture)
        {
            _renderer.material.mainTexture = ActivateTexture;
        }

	    if (!IsActivated && texture != DeactivatedTexture)
	    {
            _renderer.material.mainTexture = DeactivatedTexture;
        }
	}
}
